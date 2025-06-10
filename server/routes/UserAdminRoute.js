import express, { Router } from "express";
import {getUserAdmin, Register, Login, Logout} from "../controllers/Admin.js";
import { verifytoken } from "../middlewere/Token.js";
import { refreshToken } from "../controllers/refreshToken.js";


const router = express.Router();

router.get('/useradmin', verifytoken, getUserAdmin);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);



export default router;