// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    content : {type:String, required:true},
    userid: {type:mongoose.Types.ObjectId, ref: 'User'},
    title : {type:String, required:true},
}, {timestamps : true});
    
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;