import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import app from "./app";

const PORT = process.env.PORT || 8081;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.log("❌ Database connection failed", error));
