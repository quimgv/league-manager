const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Phase = require("../models/phase");

exports.create_phase = async (req, res) => {
  const phase = new Phase({ ...req.body });

  try {
    await phase.save();

    res.status(201).json({ phase });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_phases = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const phases = await Phase.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(phases);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_phase = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.id);
    if (!phase) {
      return res.status(404).json("Phase not found");
    }
    res.json(phase);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_phase = async (req, res) => {
  let updates = req.body;

  try {
    let phase = await Phase.findById(req.params.id);

    if (!phase) {
      res.status(404).json("Phase not found");
    }
    updates = _.merge(phase, updates);
    const phaseUpdate = await Phase.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(phaseUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_phase = async (req, res) => {
  try {
    const phase = await Phase.findByIdAndDelete(req.params.id);
    res.json(phase);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
