import mongoose from "mongoose";

const emplopyeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vegetable: { type: String, required: true },
  whyVegetable: { type: String, required: true },
});


const EmployeeModel = mongoose.model("employees", emplopyeeSchema)
export default EmployeeModel