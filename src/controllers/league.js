const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const League = require("../models/league");

exports.create_league = async (req, res) => {
  const league = new League({ ...req.body, owner: req.user._id });

  try {
    await league.save();

    res.status(201).json({ league });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_leagues = async (req, res) => {
  let filters = {};

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const leagues = await League.find(filters, null, { limit, skip });
    res.status(201).json(leagues);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_my_leagues = async (req, res) => {
  const userId = req.user._id;

  let filters = {};

  try {
    let leagues = await League.find({}).populate("registrations");
    if (leagues.length === 0) {
      throw new Error("Leagues not found");
    }
    res.json(leagues);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_league = async (req, res) => {

  const matchCategories = req.query.category ? { _id: { $in: req.query.category.split(",") } } : null;

  try {
    const league = await League.findById(req.params.id)
      .populate({
        path: "registrations",
        select: "_id team",
        populate: { path: "team", select: "_id name image" }
      })
      .populate({ path: "zones", select: "_id name" })
      .populate({
        path: "categories",
        match: matchCategories,
        select: "_id name"
      });
    if (!league) {
      return res.status(404).json("League not found");
    }
    res.json(league);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_league = async (req, res) => {
  let updates = req.body;

  try {
    let league = await League.findById(req.params.id);

    if (!league) {
      res.status(404).json("League not found");
    }
    updates = _.merge(league, updates);
    const leagueUpdate = await League.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(leagueUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_league = async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    res.json(league);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.get_image_league = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league || !league.image) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(league.image);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: error.message });
  }
};

(exports.upload_image_league = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  try {
    const league = await League.findById(req.params.id);
    league.image = buffer;
    await league.save();
    res.json(league);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}),
  (error, req, res, next) => {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  };

exports.delete_image_league = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json("League not found");
    }
    league.image = null;
    await league.save();
    res.json(league);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};
