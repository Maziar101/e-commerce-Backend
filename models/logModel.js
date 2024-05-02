import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  userId: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  body: { type: Object },
},{timestamps:true});

const Log = mongoose.model("Log", logSchema);

export default Log