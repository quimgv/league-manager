const mongoose = require("mongoose");
const sharp = require("sharp");
const _ = require("lodash");

// Load models
const Team = require("../models/team");

exports.create_team = async (req, res) => {
  const team = new Team({ ...req.body });

  try {
    const teamCheck = await Team.find({ name: req.body.name })
    if(teamCheck.length > 1) {
        throw new Error('Este nombre ya está siendo utilizado por otro equipo, por favor escoge otro.');
    }
    await team.save();

    res.status(201).json({ team });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_teams = async (req, res) => {
  let filters = {};

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const teams = await Team.find(filters, null, { limit, skip });
    res.status(201).json(teams);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_team = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json("Team not found");
    }
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_team = async (req, res) => {
  let updates = req.body;

  try {
    let team = await Team.findById(req.params.id);

    if (!team) {
      res.status(404).json("Team not found");
    }
    updates = _.merge(team, updates);
    const teamUpdate = await Team.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(teamUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_team = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.get_image_team = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team || !team.image) {
      throw new Error('Team or image team not found');
    }
    res.set("Content-Type", "image/png");
    res.send(team.image);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: error.message });
  }
};

(exports.upload_image_team = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  try {
    const team = await Team.findById(req.params.id);
    team.image = buffer;
    await team.save();
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}),
  (error, req, res, next) => {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  };

exports.delete_image_team = async (req,res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
          return res.status(404).json("Team not found");
        }
        team.image = null;
        await team.save();
        res.json(team);
      } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
      }
};
