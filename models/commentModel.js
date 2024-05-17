import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    post: { type: String, required: true },
    authorId:{
      type:String,
      required:true,
    },
    product: {type:String, required: true},
    replay: [
      {
        type:mongoose.Types.ObjectId,
        ref:"Comments",
      },
    ],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentSchema);

export default Comments;
