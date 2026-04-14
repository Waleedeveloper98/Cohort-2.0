import { Router } from "express";
import { authValidator } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import multer, { memoryStorage } from "multer"

const upload = multer({ storage: memoryStorage() })

const productRouter = Router();

productRouter.post("/", authValidator, upload.array("images", 5), createProduct)

export default productRouter