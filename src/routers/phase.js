const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const PhaseController = require('../controllers/phase');

// @route   POST /phase
// @desc    Create new phase
// @access  Private
router.post('/', auth, PhaseController.create_phase);

// @route   GET /phase
// @desc    Get phases
// @access  Public
router.get('/', PhaseController.get_phases);

// @route   GET /phase/:id
// @desc    Get phase by id
// @access  Public
router.get('/:id', PhaseController.get_phase);

// @route   PATCH /phase/:id
// @desc    Edit phase
// @access  Private
router.patch('/:id', auth, PhaseController.edit_phase);

// @route   DELETE /phase
// @desc    Delete phase
// @access  Private
router.delete('/:id', auth, PhaseController.delete_phase);

module.exports = router