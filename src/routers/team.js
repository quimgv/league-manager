const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const TeamController = require('../controllers/team');

// @route   POST /team
// @desc    Create new team
// @access  Private
router.post('/', auth, TeamController.create_team);

// @route   GET /team
// @desc    Get teams
// @access  Public
router.get('/', TeamController.get_teams);

// @route   GET /team/:id
// @desc    Get team by id
// @access  Public
router.get('/:id', TeamController.get_team);

// @route   PATCH /team/:id
// @desc    Edit team
// @access  Private
router.patch('/:id', auth, TeamController.edit_team);

// @route   DELETE /team
// @desc    Delete team
// @access  Private
router.delete('/:id', auth, TeamController.delete_team);

// @route   GET /team/:id/image
// @desc    Get team image
// @access  Private
router.get('/:id/image', TeamController.get_image_team);

// @route   POST /team/:id/image
// @desc    Upload team image
// @access  Private
router.post('/:id/image', auth, upload.single('team_image'), TeamController.upload_image_team);

// @route   DELETE /team/:id/image
// @desc    Delete image team
// @access  Private
router.delete('/:id/image', auth, TeamController.delete_image_team);

module.exports = router