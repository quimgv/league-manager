const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const ZoneController = require('../controllers/zone');

// @route   POST /zone
// @desc    Create new zone
// @access  Private
router.post('/', auth, ZoneController.create_zone);

// @route   GET /zone
// @desc    Get zones
// @access  Public
router.get('/', ZoneController.get_zones);

// @route   GET /zone/:id
// @desc    Get zone by id
// @access  Public
router.get('/:id', ZoneController.get_zone);

// @route   PATCH /zone/:id
// @desc    Edit zone
// @access  Private
router.patch('/:id', auth, ZoneController.edit_zone);

// @route   DELETE /zone
// @desc    Delete zone
// @access  Private
router.delete('/:id', auth, ZoneController.delete_zone);

module.exports = router