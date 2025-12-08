import * as express from "express";
import {
  register,
  login,
  refreshTokenRoute,
} from "../controllers/auth.controller";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshTokenRoute);


export default router;