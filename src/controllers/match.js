const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Match = require("../models/match");

exports.create_match = async (req, res) => {
  const match = new Match({ ...req.body });

  try {
    await match.save();

    res.status(201).json({ match });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_matchs = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const matchs = await Match.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(matchs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_match = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json("Match not found");
    }
    res.json(match);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_match = async (req, res) => {
  let updates = req.body;

  try {
    let match = await Match.findById(req.params.id);

    if (!match) {
      res.status(404).json("Match not found");
    }
    updates = _.merge(match, updates);
    const matchUpdate = await Match.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(matchUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_match = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    res.json(match);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
