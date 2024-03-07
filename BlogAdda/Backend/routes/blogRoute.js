// const express = require('express')
import express from 'express';
import blogController from '../controllers/blogController.js';
import User from '../models/userModel.js';
import Feedback from '../models/feedback.js';

const router = express.Router()

// GET all workouts
router.get('/', blogController.getBlogs)

// GET a single workout
router.get('/:id', blogController.getBlog)

// POST a new workout
router.post('/', blogController.createBlog)

// DELETE a workout
router.delete('/:id', blogController.deleteBlog)

// UPDATE a workout
router.patch('/:id', blogController.updateBlog)

// Add a comment
router.post('/comment', blogController.addComment)

router.post('/createfeedback', blogController.addFeedback)

router.get('/feedback/getFeedback', async (req, res) => {
    try {
        const allFeedback = await Feedback.find().populate('userid', 'fullname profilepic');
        console.log("I am here");
        console.log(allFeedback);
        res.json(allFeedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        //res.status(500).json({ error: 'Internal Server Error' });
        res.json({mes : "Hwlloo"});
      }
  });

export default router;