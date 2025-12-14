import * as express from "express";
import * as dotenv from "dotenv";
import type { PortSettings } from "./server_types";
import { connectDB } from "./db/db";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import authRouter from "./router/authRouter";
import postsRouter from "./router/postsRouter"


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
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
