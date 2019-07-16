const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Group = require("../models/group");

exports.create_group = async (req, res) => {
  const group = new Group({ ...req.body });

  try {
    await group.save();

    res.status(201).json({ group });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_groups = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const groups = await Group.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(groups);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_group = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json("Group not found");
    }
    res.json(group);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_group = async (req, res) => {
  let updates = req.body;

  try {
    let group = await Group.findById(req.params.id);

    if (!group) {
      res.status(404).json("Group not found");
    }
    updates = _.merge(group, updates);
    const groupUpdate = await Group.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(groupUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_group = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    res.json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
