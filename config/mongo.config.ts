require('dotenv').config();
import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import infoLogs, { LogTypes } from '../utils/logger.untils';


const { MONGO_URL } = process.env;

let client: MongoClient | undefined;
export let db: Db;

export const connectToDatabase = async () => {
  if (!client) {
    // Create a new MongoClient
    client = new MongoClient(MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);

    try {
      // Connect to MongoDB
      await client.connect();
      console.log("Connected to mongoDB");

      // Select the database to use
      db = client.db(process.env.MONGO_DATABASE!);

      // Log a message when successfully connected to MongoDB
      infoLogs('Connected to MongoDB', LogTypes.INFO);
    } catch (err) {
      // Log an error message if the connection to MongoDB fails
      infoLogs(`Failed to connect to , LogTypes.LOGSMongoDB: ${err}`, LogTypes.ERROR_LOG);
      client.close();
    }
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not connected');
  }

  return db;
};
