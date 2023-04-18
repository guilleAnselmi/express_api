import Debug from "debug";
import express from "express";
import Test from "../models/test";
import testController from "../controllers/testController";
import { checkJwt } from "../helpers/token";
const api = express.Router();
const debug = Debug("app:test");


// If you wanna use controllers
api.get("/", testController.findAll);

// if you don't want to use controllers
api.post("/", checkJwt, async (req, res) => {
  const test = await Test.create(req.body);
  res.status(200).json({
    data: test,
  });
});

export default api;
