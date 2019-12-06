import express from 'express';
import Debug from 'debug';
import Test from '~/controllers/test';
const debug = new Debug('routes/test');
const api = express.Router();

// only testing
api.get('*', async (req, res) => {
  debug(`findAll tests`);
  //   const users = await User.getUsers().catch(err => {
  res.status(200).json({
    message: 'users',
    data: {
      test: 'pass'
    }
  });
});

export default api;
