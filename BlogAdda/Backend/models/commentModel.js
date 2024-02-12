// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment_details : {type:String, required:true},
    userid: {type:mongoose.Types.ObjectId, ref: 'User'},
    blogid: {type:mongoose.Types.ObjectId, ref: 'Comment'},
}, {timestamps : true});
    
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;