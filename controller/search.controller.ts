import { Request, Response } from "express";
import NftSearchService from "../service/search.service";
import SearchNftUtils from "../utils/search.utils";
import SearchRepository from "../repository/search.repository";
import { STATUS_CODES } from "http";
import { ResponseText, StatusCode } from "../types/enum/response.enum";
import infoLogs, { LogTypes } from "../utils/logger.untils";
import { ResponseFormat } from "../types/interface/response.interface";
import { Method } from "../types/enum/method.enum";
import { RouteName } from "../types/enum/route-name.enum";

export default class NftDetailsController {
  searchService: NftSearchService;
  searchUtils: SearchNftUtils;
  repository: SearchRepository;

  constructor() {
    this.searchService = new NftSearchService();
    this.searchUtils = new SearchNftUtils();
    this.repository = new SearchRepository();
  }

  /**
   * For searching matching collection names and item name, tokens
   * @param input
   * @param req
   * @param res
   */
  public execute = async (req: Request, res: Response) => {
    try {
      const method = req.method;
      const routeName = req.path.split("/")[1];
      infoLogs(
        `HTTP method: ${method}, Route name: ${routeName} -Search`,
        LogTypes.INFO
      );
      let response: ResponseFormat = {
        success: false,
      };
      if (Method.GET === method) {
        if (routeName === RouteName.GLOBAL) {
          const { input } = req.query;
          const pageSize = parseInt(req.query.pageSize as string);
          const page = parseInt(req.query.page as string);
          response = await this.searchService.globalSearch(
            input as string,
            pageSize,
            page
          );
        }
      }
      res.status(StatusCode.OK).send(response);
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
