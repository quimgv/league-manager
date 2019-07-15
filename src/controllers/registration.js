const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Registration = require("../models/registration");

exports.create_registration = async (req, res) => {
  const registration = new Registration({ ...req.body });

  try {
    await registration.save();

    res.status(201).json({ registration });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_registrations = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }
  if (req.query.team) {
    filters = { team: req.query.team };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const registrations = await Registration.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(registrations);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_registration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json("Registration not found");
    }
    res.json(registration);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_registration = async (req, res) => {
  let updates = req.body;

  try {
    let registration = await Registration.findById(req.params.id);

    if (!registration) {
      res.status(404).json("Registration not found");
    }
    updates = _.merge(registration, updates);
    const registrationUpdate = await Registration.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(registrationUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_registration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    res.json(registration);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
