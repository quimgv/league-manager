const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const leagueController = require('../controllers/league');

// @route   POST /league
// @desc    Create new league
// @access  Private
router.post('/', auth, UsersController.create_league);

// @route   GET /league
// @desc    Get leagues
// @access  Public
router.get('/', UsersController.get_leagues);

// @route   GET /league/:id
// @desc    Get league by id
// @access  Public
router.get('/:id', UsersController.get_league);

// @route   PATCH /league/:id
// @desc    Edit league
// @access  Private
router.patch('/:id', auth, UsersController.edit_league);

// @route   DELETE /league
// @desc    Delete league
// @access  Private
router.delete('/', auth, UsersController.delete_league);

// @route   GET /league/image/:id
// @desc    Get league image
// @access  Private
router.get('/image/:id', UsersController.get_image_league);

// @route   POST /league/image
// @desc    Upload league image
// @access  Private
router.post('/image', auth, upload.single('avatar'), UsersController.upload_image_league);

// @route   DELETE /league/image
// @desc    Delete image
// @access  Private
router.delete('/image', auth, UsersController.delete_image_league);

module.exports = router