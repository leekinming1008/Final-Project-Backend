import express from "express"
import { getAllCategory } from "../controller/categoryController";

const categoryRoutes = express.Router();

categoryRoutes.route("/").get(getAllCategory);

export default categoryRoutes