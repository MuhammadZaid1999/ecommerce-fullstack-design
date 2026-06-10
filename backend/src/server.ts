import { connectDB } from "@/config/db";
import { env } from "@/config/env";
import { app } from "./app";

await connectDB();

app.listen(env.port, () => {
  console.log(`API server listening on http://localhost:${env.port}`);
});
