import mongoose from "mongoose";
import slugify from "slugify";
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Category field can not be empty'],
        unique: [true,'Category already exists'],
        trim: true,
    },
    image:{
        type: String,
    },
    slug:{
        type: String, 
        trim: true,
    },
});
CategorySchema.pre('save',(next)=>{
    if(this.slug){
        next();
    }else{
        this.slug = slugify(this.name,{'lower':true});
        next();
    }
});
const Categories = mongoose.model('Categories',CategorySchema);
export default Categories;