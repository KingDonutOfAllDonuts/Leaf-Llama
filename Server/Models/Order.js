import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  cart: Array,
  details: Object,
  done : {
    type: Boolean,
    default: false
  },
  date: Number
})

const OrderModel = mongoose.model("orders", OrderSchema)
export default OrderModel