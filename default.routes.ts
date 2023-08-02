import { Router } from 'express';
import { initiliazeServer } from './controller/main.controller';
import NftDetailsController from './controller/search.controller';

export const router: Router = Router();
const { globalSearch: searchGames} = new NftDetailsController();

router.get('/start', initiliazeServer);
 

//router.post('/mixed-market', searchMixedMarket);
router.get('/global/search', searchGames);