const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const MatchController = require('../controllers/match');

// @route   POST /match
// @desc    Create new match
// @access  Private
router.post('/', auth, MatchController.create_match);

// @route   GET /match
// @desc    Get matchs
// @access  Public
router.get('/', MatchController.get_matchs);

// @route   GET /match/:id
// @desc    Get match by id
// @access  Public
router.get('/:id', MatchController.get_match);

// @route   PATCH /match/:id
// @desc    Edit match
// @access  Private
router.patch('/:id', auth, MatchController.edit_match);

// @route   DELETE /match
// @desc    Delete match
// @access  Private
router.delete('/:id', auth, MatchController.delete_match);

module.exports = router