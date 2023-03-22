import { MongoClient, ServerApiVersion } from "mongodb";
import { envConfig } from "../helpers/env";

// const uri = "mongodb+srv://<username>:<password>@mvpdb.3bqpc.mongodb.net/?retryWrites=true&w=majority";

let client: MongoClient | undefined;

export function getMongoConnection() {
  if (client) {
    return client;
  }
  if (global["MONGO_DB_URI"]) {
    return global["MONGO_DB_URI"] as MongoClient;
  }
  client = new MongoClient(envConfig.MONGO_DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  global["MONGO_DB_URI"] = client;
  return client;
}
