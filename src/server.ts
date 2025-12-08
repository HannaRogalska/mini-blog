import * as express from "express";
import * as dotenv from "dotenv";
import type { PortSettings } from "./server_types";
import { connectDB } from "./db/db";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import authRouter from "./router/authRouter";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(cookieParser());

const serverPort: PortSettings = { port: Number(process.env.PORT) || 3001 };

const serverRun = async () => {
  try {
    await connectDB();
    app.listen(serverPort.port, () => {
      console.log(`✅ Server running on port ${serverPort.port}`);
    });
  } catch (err) {
    console.log(`❌ Failed to start server: ${err}`);
  }
};
serverRun();
