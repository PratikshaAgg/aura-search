import { db } from "../config/mongo.config";
import MongoCollections from "../types/enum/mongo-collection.enum";

export default class SearchRepository {
  public atlasSearch = async (query: any) => {
    return db
      .collection(MongoCollections.NFT_DETAILS)
      .aggregate(query)
      .toArray();
  };

  public filterGames = async (ids: string[]) => {
    return db
      .collection(MongoCollections.GAMES)
      .find({ id: { $in: ids }, is_deleted: false })
      .toArray();
  };

  public searchGames = async (pipeline: any) => {
    return db.collection(MongoCollections.GAMES).aggregate(pipeline).toArray();
  };

  public findNameTokenGlobal = async (pipeline: any) => {
    return db
      .collection(MongoCollections.NFT_TEMP)
      .aggregate(pipeline)
      .toArray();
  };
}
