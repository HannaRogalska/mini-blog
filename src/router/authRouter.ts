import * as express from "express";
import {register, login} from "../controllers/auth.controller"

const router = express.Router()

router.post("/register", register);
router.get("/login", login)


export default router;