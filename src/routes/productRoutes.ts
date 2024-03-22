import express from "express";
import {getAllProducts, getProduct, getUserProducts, addProduct, editProduct, removeProduct} from "../controller/productController";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:productId").get(getProduct);
productRouter.route("/fromUser/:userId").get(getUserProducts);
productRouter.route("/").post(addProduct);
productRouter.route("/:productId").put(editProduct);
productRouter.route("/:productId").delete(removeProduct);

export default productRouter;