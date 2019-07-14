const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const RegistrationController = require('../controllers/registration');

// @route   POST /registration
// @desc    Create new registration
// @access  Private
router.post('/', auth, RegistrationController.create_registration);

// @route   GET /registration
// @desc    Get registrations
// @access  Public
router.get('/', RegistrationController.get_registrations);

// @route   GET /registration/:id
// @desc    Get registration by id
// @access  Public
router.get('/:id', RegistrationController.get_registration);

// @route   PATCH /registration/:id
// @desc    Edit registration
// @access  Private
router.patch('/:id', auth, RegistrationController.edit_registration);

// @route   DELETE /registration
// @desc    Delete registration
// @access  Private
router.delete('/:id', auth, RegistrationController.delete_registration);

module.exports = router