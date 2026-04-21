import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { cartValidation } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId/:variantId", authValidation, cartValidation, addToCart);

cartRouter.get("/", authValidation, getCart);

export default cartRouter;