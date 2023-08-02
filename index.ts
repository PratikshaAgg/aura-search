import { connectToDatabase } from "./config/mongo.config";
import { app } from "./express";
import infoLogs, { LogTypes } from "./utils/logger.untils";
const PORT = process.env.PORT || 9283;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

(async () => {
    await Promise.all([connectToDatabase()]);
    infoLogs({ message: `init gql started` }, LogTypes.INFO);
  })();
