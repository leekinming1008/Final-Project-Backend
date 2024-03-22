import express from "express";
import userRouter from "./routes/userRoutes"
import commentRouter from "./routes/commentRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import postRouter from "./routes/postRoutes";
import productRouter from "./routes/productRoutes";
const app = express();

// MIDDLEWARE for format the request body
app.use(express.json({limit: "10kb"}));

// URL Encoder
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routing
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRouter);
app.use("/api/product", productRouter);

// get to the home page
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Our Express Server");
})

export default app