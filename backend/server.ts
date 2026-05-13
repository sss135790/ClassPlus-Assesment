import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import profileRoute from "./routes/profile";

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/api/profile", profileRoute);
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to the Greeting App API" });
});

// Start server AFTER DB connection
const startServer = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
