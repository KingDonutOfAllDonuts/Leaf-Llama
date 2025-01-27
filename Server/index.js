import express from "express";
import mongoose, { mongo } from "mongoose";
import { authenticateToken } from "./middleware/auth.js";
import cors from "cors";
import OrderModel from "./Models/Order.js";
import EmployeeModel from "./Models/Employee.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri);

app.post("/get", async (req, res) => {
  try {
    const orderIds = req.body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return res.status(400).json({ error: "Invalid or missing orderIds" });
    }

    // f orders matching the provided ids
    const orders = await OrderModel.find({ _id: { $in: orderIds } });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getAll", async (req, res) => {
  OrderModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const cart = req.body.cart;
  const details = req.body.details;
  const date = req.body.date;
  if (cart == null) {
    return;
  }
  OrderModel.create({
    cart,
    details,
    date,
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

app.put("/toggleDone/:id", (req, res) => {
  const { id } = req.params;

  // Find the current order
  OrderModel.findById(id)
    .then((curr) => {
      // Toggle the `done` status
      OrderModel.findByIdAndUpdate(
        { _id: id },
        { done: !curr.done },
        { new: true }
      )
        .then((updatedOrder) => {
          res.json(updatedOrder);

          // schedule deletion
          if (!curr.done) {
            setTimeout(() => {
              OrderModel.findById(id)
                .then((order) => {
                  if (order && order.done) {
                    OrderModel.findByIdAndDelete(id)
                      .then(() =>
                        console.log(`Order ${id} deleted after 120 seconds`)
                      )
                      .catch((err) =>
                        console.error(`Failed to delete order ${id}:`, err)
                      );
                  } else {
                    console.log(
                      `Order ${id} was not deleted because its status was reset.`
                    );
                  }
                })
                .catch((err) =>
                  console.error(`Failed to recheck order ${id}:`, err)
                );
            }, 120000); // 120 seconds
          }
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, vegetable, whyVegetable } = req.body;
    if (!name || !email || !password || !vegetable || !whyVegetable) {
      return res.status(400).json({ message: "Missing Information" });
    }

    // Check if user already exists
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
      vegetable,
      whyVegetable,
    });

    // Generate a token
    const token = jwt.sign({ id: newEmployee._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const employee = await EmployeeModel.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const employee = await EmployeeModel.findById(userId, "-password"); // Exclude password
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("Server is running");
});
