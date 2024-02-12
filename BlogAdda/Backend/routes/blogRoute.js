// const express = require('express')
import express from 'express';
import blogController from '../controllers/blogController.js';

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

export default router;