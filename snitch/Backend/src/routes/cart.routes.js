import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { cartValidation, decrementValidation, incrementValidation } from "../validators/cart.validator.js";
import { addToCart, deleteCartItem, getCart, updateQuantityDecrement, updateQuantityIncrement } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId/:variantId", authValidation, cartValidation, addToCart);

cartRouter.get("/", authValidation, getCart);

cartRouter.patch("/update/quantity/increment/:productId/:variantId", authValidation, incrementValidation, updateQuantityIncrement)

cartRouter.patch("/update/quantity/decrement/:productId/:variantId", authValidation, decrementValidation, updateQuantityDecrement)

cartRouter.delete("/delete/:productId/:variantId", authValidation, deleteCartItem)

export default cartRouter;