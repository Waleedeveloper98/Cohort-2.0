import { Router } from "express";
import { createProduct, getAllProducts, getProductDetails, getSellerProducts } from "../controllers/product.controller.js";
import multer, { memoryStorage } from "multer"
import { sellerAuthValidator } from "../middlewares/sellerAuth.middleware.js";

const upload = multer({ storage: memoryStorage() })

const productRouter = Router();

/**
 *@route /api/products
 *@desc Create a new product (Seller only)
 *@access Private (Seller)
 */
productRouter.post("/", sellerAuthValidator, upload.array("images", 5), createProduct)

/**
 *@route /api/products/all
 *@desc Get all products (Public)
 *@access Public
 */
productRouter.get("/all", getAllProducts)


/**
 *@route /api/products/detail/:id
 *@desc Get details of a specific product (Public)
 *@access Public
 */
productRouter.get("/detail/:id", getProductDetails)

/**
 *@route /api/products
 *@desc Get products of the authenticated seller (Seller only)
 *@access Private (Seller)
 */
productRouter.get("/", sellerAuthValidator, getSellerProducts)

export default productRouter