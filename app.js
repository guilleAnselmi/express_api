import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import { router } from "./routes";
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", router);

export { app, server };
