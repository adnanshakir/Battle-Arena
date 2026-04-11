import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
