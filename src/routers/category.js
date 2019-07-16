const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const CategoryController = require('../controllers/category');

// @route   POST /category
// @desc    Create new category
// @access  Private
router.post('/', auth, CategoryController.create_category);

// @route   GET /category
// @desc    Get categorys
// @access  Public
router.get('/', CategoryController.get_categorys);

// @route   GET /category/:id
// @desc    Get category by id
// @access  Public
router.get('/:id', CategoryController.get_category);

// @route   PATCH /category/:id
// @desc    Edit category
// @access  Private
router.patch('/:id', auth, CategoryController.edit_category);

// @route   DELETE /category
// @desc    Delete category
// @access  Private
router.delete('/:id', auth, CategoryController.delete_category);

module.exports = router