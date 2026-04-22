import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { cartValidation, incrementValidation } from "../validators/cart.validator.js";
import { addToCart, getCart, updateQuantityIncrement } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId/:variantId", authValidation, cartValidation, addToCart);

cartRouter.get("/", authValidation, getCart);

cartRouter.patch("/update/quantity/increment/:productId/:variantId", authValidation, incrementValidation, updateQuantityIncrement)

export default cartRouter;