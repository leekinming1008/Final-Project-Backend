import express from "express";
import {getAllProducts, getProduct, getUserProducts, addProduct, editProduct, removeProduct} from "../controller/productController";

const productRouter = express.Router();

productRouter.route("/product").get(getAllProducts);
productRouter.route("/product/:productId").get(getProduct);
productRouter.route("/product/:userId").get(getUserProducts);
productRouter.route("/product").post(addProduct);
productRouter.route("/product/:productId").put(editProduct);
productRouter.route("/product/:productId").delete(removeProduct);