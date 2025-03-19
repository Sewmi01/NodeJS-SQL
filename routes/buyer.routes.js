import { Router } from "express";
import { buyer_signup } from "../functions/buyer.functions.js";

const buyerRouter = Router();

buyerRouter.post('/register', buyer_signup)

export default buyerRouter;