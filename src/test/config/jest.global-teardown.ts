import { getMongoConnection } from "../../core/connection";
import { envConfig } from "../../helpers/env";

async function teardown() {
  const collections = await getMongoConnection().db(envConfig.MONGO_DB_TEST_NAME).collections();
  if (collections?.length) {
    for (const collection of collections) {
      if (collection) {
        /* */
      }
      await collection.drop();
    }
  }
}

export default teardown;
