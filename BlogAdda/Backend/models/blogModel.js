// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true},
    short_description : {type:String, required:true},
    content : {type:String, required:true},
    thumbnail : {type:String, required:true},
    blogtype : {type:String, required:true},
    like : {type:Number, default : 0},
    userid: {type:mongoose.Types.ObjectId, ref: 'User'},
    
    // Add more fields as needed
}, {timestamps : true});
    
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;