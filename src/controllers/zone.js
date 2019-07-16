const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Zone = require("../models/zone");

exports.create_zone = async (req, res) => {
  const zone = new Zone({ ...req.body });

  try {
    await zone.save();

    res.status(201).json({ zone });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_zones = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const zones = await Zone.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(zones);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_zone = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json("Zone not found");
    }
    res.json(zone);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_zone = async (req, res) => {
  let updates = req.body;

  try {
    let zone = await Zone.findById(req.params.id);

    if (!zone) {
      res.status(404).json("Zone not found");
    }
    updates = _.merge(zone, updates);
    const zoneUpdate = await Zone.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(zoneUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_zone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    res.json(zone);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
