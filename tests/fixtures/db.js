const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneID,
    firstName: 'Quim',
    lastName: 'Granados',
    email: 'quim@test.com',
    password: 'test123',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
};

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    firstName: 'Ana Delia',
    lastName: 'Ortega',
    email: 'ana@test.com',
    password: 'test123',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET)
    }]
};


const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOne,
    userOneID,
    userTwo,
    userTwoID,
    setupDatabase
}