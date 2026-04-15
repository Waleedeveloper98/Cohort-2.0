import { Router } from "express";
import { authValidator } from "../middlewares/auth.middleware.js";
import { createProduct, getSellerProducts } from "../controllers/product.controller.js";
import multer, { memoryStorage } from "multer"

const upload = multer({ storage: memoryStorage() })

const productRouter = Router();

productRouter.post("/", authValidator, upload.array("images", 5), createProduct)
productRouter.get("/", authValidator, getSellerProducts)

export default productRouter