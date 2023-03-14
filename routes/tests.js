import Debug from "debug";
import express from "express";
import Test from "../models/test";
const api = express.Router();
const debug = Debug("app:test");


api.get("/", async (req, res) => {
  debug("get");
  const test = await Test.find();
  res.status(200).send({
    data: test,
  });
});

api.post("/", async (req, res) => {
  const test = await Test.create(req.body);
  res.status(200).json({
    data: test,
  });
});

export default api;
