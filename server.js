import app from "./app.js";
import mongoose from "mongoose";
const Port = process.env.PORT || 5000

app.listen(Port,()=>{
    console.log(`Server started on port ${Port}`);
});
mongoose.connect(process.env.DATA_BASE).then(res=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});
