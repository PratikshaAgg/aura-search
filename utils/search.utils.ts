import { db } from "../config/mongo.config";
import SearchRepository from "../repository/search.repository";
import MongoCollections from "../types/enum/mongo-collection.enum";

export default class SearchNftUtils {
  public getOrders = (orders: any) => {
    return Object.values(
      orders.reduce((acc: any, order: any) => {
        let key = `${order.contract}-${order.criteria.data.token.tokenId}`;
        if (!acc[key] || order.price.amount.usd < acc[key].price.amount.usd) {
          acc[key] = order;
        }
        return acc;
      }, {})
    );
  };

  public mixedMarketPlaceDefault = async (): Promise<string[]> => {
    const ids = [
      "52e39e1e-a189-4c53-8440-e89429fb365d",
      "6a19a2e9-89b1-47fe-8a69-29435bc9efbf",
      "77fbca28-596a-447f-9d57-838a41dd2581",
      "68b8543a-b624-4c90-8a72-8438851b38c4",
      "375b18df-26db-4ceb-9782-ed377f40fa79",
      "54a0b471-d499-49bf-bb6c-62473bd582d8",
      "18a74ac9-6aa4-451b-b0d5-5b997a4f45ef",
      "54a0b471-d499-49bf-bb6c-62473bd582d8",
      "6c7b8857-446a-464c-a997-f717e92f7cc9",
      "356d38c5-bfd6-4e0b-beb3-7edba31f5371",
      "6c7fddfc-c2ba-4161-9dc7-07513bebf725",
      "ef0ca6ed-2ecf-4bb1-8ca8-c33ae44193ac",
    ];
    const collectionList = await new SearchRepository().filterGames(ids);
    const listObj = [] as string[];

    for (const i of collectionList) {
      const { contract_address } = i;
      const [filterPrimary] = contract_address.filter(
        (j: any) => j.asset_type.toLowerCase() === "primary"
      );
      const { contract_address: value } = filterPrimary;
      listObj.push(value);
    }

    return listObj;
  };

  public getNftPipeline = (
    input: string,
    pageSize: number,
    page: number,
    contractAddress?: RegExp[],
    sort?: any
  ) => {
    return [
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query: input,
                  path: "name",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  },
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
                },
              },
              {
                text: {
                  query: input,
                  path: "token_id",
                  score: {
                    boost: {
                      value: 10,
                    },
                  },
                },
              },
            ],
          },
        },
      },
      {
        $skip: page * pageSize,
      },
      {
        $limit: pageSize,
      },
      {
        $project: {
          _id: 0,
          game_id: 1,
          token_id: 1,
          contract_address: 1,
          name: 1,
          image_url: 1,
          image_properties: 1,
          extra_metadata: 1,
          game_slug: 1,
          collection_slug: 1,
        },
      },
    ];
  };

  //query builder for game name search
  public globalSearchPipeline = (
    input: string,
    page: number,
    pageSize: number
  ) => {
    const limit = pageSize || 5;
    const skip = page || 0;
    return [
      {
        $search: {
          index: "game_name_index",
          compound: {
            should: [
              {
                text: {
                  query: input,
                  path: "game_name",
                  score: {
                    boost: {
                      value: 10, // Boosting exact matches
                    },
                  },
                },
              },
              {
                autocomplete: {
                  query: input,
                  path: "game_name",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  },
                  score: {
                    boost: {
                      value: 5, // Boosting autocomplete suggestions
                    },
                  },
                },
              },
            ],
          },
        },
      },
      {
        $addFields: {
          score: { $meta: "searchScore" },
        },
      },
      {
        $match: {
          is_deleted: false,
        },
      },
      { $unwind: "$contract_address" },
      {
        $match: {
          $or: [
            { "contract_address.is_deleted": { $exists: false } },
            { "contract_address.is_deleted": false },
          ],
        },
      },
      {
        $group: {
          _id: "$_id",
          game_name: { $first: "$game_name" },
          score: { $first: "$score" },
          game_slug: { $first: "$game_slug" },
          contract_address: { $push: "$contract_address" },
        },
      },
      { $sort: { score: -1 } },
      { $skip: skip * limit },
      { $limit: limit },
    ];
  };
}
