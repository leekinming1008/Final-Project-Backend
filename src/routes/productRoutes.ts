import express from "express";
import {getAllProducts, getProduct, getUserProducts, addProduct, editProduct, removeProduct} from "../controller/productController";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:productID").get(getProduct);
productRouter.route("/fromUser/:userID").get(getUserProducts);
productRouter.route("/").post(addProduct);
productRouter.route("/:productID").put(editProduct);
productRouter.route("/:productID").delete(removeProduct);

export default productRouter;