import { Router } from "express";
import { user_login, user_signup } from "../functions/user.functions.js"

const userRouter = Router();

userRouter.post('/login', user_login);
userRouter.post('/register', user_signup)

export default userRouter;