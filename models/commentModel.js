import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: String, required: true },
  replay: [
    {
      text: { type: String, required: true },
      author: { type: String, required: true },
    },
  ],
},{timestamps:true});

const Comments = mongoose.model('Comments',CommentSchema);

export default Comments 
