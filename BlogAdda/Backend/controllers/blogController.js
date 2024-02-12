import Blog from '../models/blogModel.js';
import Comment from '../models/commentModel.js';
// const mongoose = require("mongoose");
import mongoose from 'mongoose';
import Data from '../models/userModel.js';

const getBlogs = async (req, res) => {

  Blog.find({}).sort({ createdAt: -1 }).then(async (blogs) => {
    var usernames = [];
    var profilepics = [];

    for (let i = 0; i < blogs.length; i++) {
      var user_id = blogs[i].userid;
      try {
        const user = await Data.findById(user_id);
        // console.log(user.fullname);
        usernames.push(user.fullname);
        profilepics.push(user.profilepic);
        
        if (user) {
          Object.defineProperty(blogs[i], 'username', {
            value: user.fullname,          // Set the value to 42
            configurable: true,
            enumerable: true,
            writable: true,
          });

        } else {
          // Handle the case where the user is not found (optional)
          console.error(`User not found for user_id: ${user_id}`);
        }
      } catch (error) {
        // Handle any errors that occur during the query
        console.error("An error occurred:", error);
      }
    }
    
    // Now, the 'blogs' array should have the 'username' field populated
    res.status(200).json({blogs,usernames,profilepics});
  }).catch(error => {
    // Handle any errors that occur during the initial query
    console.error("An error occurred:", error);
  });
  
};

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Blog" });
  }

  const blog = await Blog.findById(id);
  var user_id = blog.userid;
  var username, profilepic;
  const comments = await Comment.find({ blogid: id }).sort({createdAt: -1});

  
  try{
    const user = await Data.findById(user_id);
    username = user.fullname;
    profilepic = user.profilepic;
    
  }catch(error){
    console.error("An error occurred:", error);
  }
  
  if (!blog) {
    return res.status(404).json({ error: "No such Blog" });
  }
  var commentusernames = [];
  var commentprofilepics = [];

  Comment.find({blogid:id}).sort({ createdAt: -1 }).then(async (comments) => {
    for (let i = 0; i < comments.length; i++) {
      var user_id = comments[i].userid;
      try {
        const user = await Data.findById(user_id);
        commentusernames.push(user.fullname);
        commentprofilepics.push(user.profilepic);
        
      } catch (error) {
        // Handle any errors that occur during the query
        console.error("An error occurred:", error);
      }
    }
    res.status(200).json({blog,username,profilepic,comments, commentusernames, commentprofilepics});
  }).catch(error => {
    // Handle any errors that occur during the initial query
    console.error("An error occurred:", error);
  });

  // res.status(200).json({blog,username,profilepic,comments, commentusernames, commentprofilepics});
};

// create a new blog
const createBlog = async (req, res) => {
  const { title, short_description, content, thumbnail, blogtype, like, email} = req.body;

  let useremail = email;
  const userData = await Data.findOne({email: useremail});
  console.log(useremail);
  
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!short_description) {
    emptyFields.push("short_description");
  }
  if (!content) {
    emptyFields.push("content");
  }
  if (!thumbnail) {
    emptyFields.push("thumbnail");
  }
  if (!blogtype) {
    emptyFields.push("blogtype");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const blog = await Blog.create({
      title,
      short_description,
      content,
      thumbnail,
      blogtype,
      like,
      userid : userData._id
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Blog" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Blog" });
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    return res.status(400).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

// Add a comment
const addComment = async (req, res) => {
  const { comment_details, blogid, email} = req.body;

  let useremail = email;
  const userData = await Data.findOne({email: useremail});



  // add to the database
  try {
    const comment = await Comment.create({
      userid : userData._id,
      blogid : blogid,
      comment_details: comment_details,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const blogController = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  addComment,
}
export default blogController;