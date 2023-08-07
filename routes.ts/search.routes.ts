import { Router } from "express";
import NftDetailsController from "../controller/search.controller";
import { initiliazeServer } from "../controller/main.controller";

export const searchRouter: Router = Router();
const { execute } = new NftDetailsController();

searchRouter.get("/start", initiliazeServer);

//router.post('/mixed-market', searchMixedMarket);
searchRouter.get("/global", execute);
