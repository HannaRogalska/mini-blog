import * as express from "express";
import {
  register,
  login,
  refreshTokenRoute,
  logout
} from "../controllers/auth.controller";


const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshTokenRoute);
router.post("/logout", logout)


export default router;