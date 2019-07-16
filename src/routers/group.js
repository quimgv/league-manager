const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const GroupController = require('../controllers/group');

// @route   POST /group
// @desc    Create new group
// @access  Private
router.post('/', auth, GroupController.create_group);

// @route   GET /group
// @desc    Get groups
// @access  Public
router.get('/', GroupController.get_groups);

// @route   GET /group/:id
// @desc    Get group by id
// @access  Public
router.get('/:id', GroupController.get_group);

// @route   PATCH /group/:id
// @desc    Edit group
// @access  Private
router.patch('/:id', auth, GroupController.edit_group);

// @route   DELETE /group
// @desc    Delete group
// @access  Private
router.delete('/:id', auth, GroupController.delete_group);

module.exports = router