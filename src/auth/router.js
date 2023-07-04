const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models/users-model');
const basicAuth = require('./middleware/basic');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.post('/signin', basicAuth, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
