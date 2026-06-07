import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { app } from "./app.js";

await connectDB(env.mongoUri);

app.listen(env.port, () => {
  console.log(`API server listening on http://localhost:${env.port}`);
});
