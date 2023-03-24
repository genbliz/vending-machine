import { MongoClient, ServerApiVersion } from "mongodb";
import { envConfig } from "../helpers/env";

// const uri = "mongodb+srv://<username>:<password>@mvpdb.3bqpc.mongodb.net/?retryWrites=true&w=majority";

let client: MongoClient | undefined;

export function getMongoConnection() {
  if (client) {
    return client;
  }
  client = new MongoClient(envConfig.MONGO_DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
}

export function getMongoDbConnection() {
  const dbname = envConfig.NODE_ENV === "test" ? envConfig.MONGO_DB_TEST_NAME : envConfig.MONGO_DB_NAME;
  return getMongoConnection().db(dbname);
}
