import { Router } from "express";
import { createProduct, getAllProducts, getProductDetails, getSellerProducts } from "../controllers/product.controller.js";
import multer, { memoryStorage } from "multer"
import { sellerAuthValidator } from "../middlewares/sellerAuth.middleware.js";

const upload = multer({ storage: memoryStorage() })

const productRouter = Router();

productRouter.post("/", sellerAuthValidator, upload.array("images", 5), createProduct)
productRouter.get("/all", getAllProducts)
productRouter.get("/:id", getProductDetails)
productRouter.get("/", sellerAuthValidator, getSellerProducts)

export default productRouter