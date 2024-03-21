import express from "express";
import userRouter from "./routes/userRoutes"
const app = express();

// MIDDLEWARE for format the request body
app.use(express.json({limit: "10kb"}));

// URL Encoder
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routing
 app.use("/api/user", userRouter)

// get to the home page
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Our Express Server");
})

export default app