import SearchRepository from "../repository/search.repository";

export default class NftSearchService extends SearchRepository {
public getMixedMarketNfts = async (
    contractAddress: String[],
    pageSize: number,
    page: number
  ) => {
    //contractAddress.map((ca) => ca.toLowerCase());
    const query = [
      {
        $search: {
          index: "search-index",
          text: {
            query: contractAddress,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $skip: page*pageSize
      },
      {
        $limit: pageSize
      }
    ];
    return this.atlasSearch(query);
  };
}
