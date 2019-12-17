const _ = require('lodash');

// Load models
const Category = require('../models/category');
const League = require('../models/league');
const Zone = require('../models/zone');

exports.create_category = async (req, res) => {
  const name = req.body.name ? req.body.name : null;
  const gender = req.body.gender ? req.body.gender : null;
  const league = req.body.league ? req.body.league : null;
  const zone = req.body.zone ? req.body.zone : null;

  const category = new Category({
    name,
    gender,
    league,
    zone
  });

  console.log('controler', category);

  try {
    const league = await League.findById(req.body.league);
    if (!league) {
      throw new Error('Esta liga no existe');
    }
    if (req.body.zone) {
      const zone = await Zone.findById(req.body.zone);
      if (!zone) {
        throw new Error('Esta zona no existe');
      }
    }

    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
};

exports.get_categorys = async (req, res) => {
  let filters = {};

  if (req.query.league) {
    filters = { league: req.query.league };
  }

  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const categorys = await Category.find(filters, null, {
      limit,
      skip
    });
    res.status(201).json(categorys);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.get_category = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json('Category not found');
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.edit_category = async (req, res) => {
  let updates = req.body;

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json('Category not found');
    }
    updates = _.merge(category, updates);
    const categoryUpdate = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(categoryUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.delete_category = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
