import { Request, Response } from "express";
import NftSearchService from "../service/search.service";
import SearchNftUtils from "../utils/search.utils";
import SearchRepository from "../repository/search.repository";
import { STATUS_CODES } from "http";
import { ResponseText, StatusCode } from "../types/enum/response.enum";
import infoLogs, { LogTypes } from "../utils/logger.untils";

export default class NftDetailsController {
  nftService: NftSearchService;
  searchUtils: SearchNftUtils;
  repository: SearchRepository;

  constructor() {
    this.nftService = new NftSearchService();
    this.searchUtils = new SearchNftUtils();
    this.repository = new SearchRepository();
  }

  /**
   * For searching matching collection names and item name, tokens
   * @param input
   * @param req
   * @param res
   */
  public globalSearch = async (req: Request, res: Response) => {
    try {
      const { input } = req.query;
      const pageSize = parseInt(req.query.pageSize as string);
      const page = parseInt(req.query.page as string);
      const query = { $text: { $search: input } };
      const globalSearchPipeline = this.searchUtils.globalSearchPipeline(
        input as string,
        page,
        pageSize
      );
      const pipeline = this.searchUtils.getNftPipeline(query, pageSize, page);
      const [collections, items] = await Promise.all([
        await this.repository.searchGames(globalSearchPipeline),
        await this.repository.findNameGlobal(pipeline),
      ]);
      res.status(StatusCode.OK).send({ success: true, response: {collections, items } });
    } catch (err) {
      infoLogs(
        `${ResponseText.INTERNAL_ERROR}: ${JSON.stringify(err)}`,
        LogTypes.ERROR_LOG
      );
      res
        .status(StatusCode.InternalServerError)
        .send({ success: false, message: ResponseText.INTERNAL_ERROR });
    }
  };

}
