import express, { Request, RequestHandler, Response } from "express";
import { json } from 'body-parser';
import { router } from "./default.routes";

export const app = express();
// app.use(cors());

app.use(json() as RequestHandler)
app.use('/main', router);