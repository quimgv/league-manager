const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const LeagueController = require('../controllers/league');

// @route   POST /league
// @desc    Create new league
// @access  Private
router.post('/', auth, LeagueController.create_league);

// @route   GET /league
// @desc    Get leagues
// @access  Public
router.get('/', LeagueController.get_leagues);

// @route   GET /league/my-leagues
// @desc    Get my leagues
// @access  Private
router.get('/my-leagues', auth, LeagueController.get_my_leagues);

// @route   GET /league/:id
// @desc    Get league by id
// @access  Public
router.get('/:id', LeagueController.get_league);

// @route   PATCH /league/:id
// @desc    Edit league
// @access  Private
router.patch('/:id', auth, LeagueController.edit_league);

// @route   DELETE /league
// @desc    Delete league
// @access  Private
router.delete('/:id', auth, LeagueController.delete_league);

// @route   GET /league/:id/image
// @desc    Get league image
// @access  Private
router.get('/:id/image', LeagueController.get_image_league);

// @route   POST /league/:id/image
// @desc    Upload league image
// @access  Private
router.post('/:id/image', auth, upload.single('league_image'), LeagueController.upload_image_league);

// @route   DELETE /league/:id/image
// @desc    Delete image league
// @access  Private
router.delete('/:id/image', auth, LeagueController.delete_image_league);

module.exports = router