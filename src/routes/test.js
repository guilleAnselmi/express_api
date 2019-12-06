import express from 'express';
import Debug from 'debug';
import Test from '@/controllers/test';
// const test = new Test();
const debug = new Debug('api/routes/test');
const api = express.Router();

// only testing
api.get('/', async (req, res, next) => {
  const users = await Test.findAll();
  debug(users);
  res.status(200).json({
    data: users
  });
});

api.post('/', async (req, res, next) => {
  const user = await Test.create();
  res.status(200).json({
    data: user
  });
});

module.exports = api;
