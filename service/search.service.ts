import SearchRepository from "../repository/search.repository";
import SearchNftUtils from "../utils/search.utils";

export default class NftSearchService extends SearchRepository {
  searchUtils: SearchNftUtils;
  constructor() {
    super();
    this.searchUtils = new SearchNftUtils();
  }

  public globalSearch = async (
    input: string,
    pageSize: number,
    page: number
  ) => {
    try {
      const globalSearchPipeline = this.searchUtils.globalSearchPipeline(
        input,
        page,
        pageSize
      );
      const nftPipeline = this.searchUtils.getNftPipeline(
        input,
        pageSize,
        page
      );
      const [collections, items] = await Promise.all([
        await this.searchGames(globalSearchPipeline),
        await this.findNameTokenGlobal(nftPipeline),
      ]);
      return {
        success: true,
        data: { collections, items },
      };
    } catch (err) {
      throw err;
    }
  };

  // public getMixedMarketNfts = async (
  //   contractAddress: String[],
  //   pageSize: number,
  //   page: number
  // ) => {
  //   //contractAddress.map((ca) => ca.toLowerCase());
  //   const query = [
  //     {
  //       $search: {
  //         index: "search-index",
  //         text: {
  //           query: contractAddress,
  //           path: {
  //             wildcard: "*",
  //           },
  //         },
  //       },
  //     },
  //     {
  //       $skip: page * pageSize,
  //     },
  //     {
  //       $limit: pageSize,
  //     },
  //   ];
  //   return this.atlasSearch(query);
  // };
}
