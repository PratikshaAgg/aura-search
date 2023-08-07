import express, { Request, RequestHandler, Response } from "express";
import { json } from 'body-parser';
import { searchRouter } from "./routes.ts/search.routes";

export const app = express();
// app.use(cors());

app.use(json() as RequestHandler)
app.use('/search', searchRouter);