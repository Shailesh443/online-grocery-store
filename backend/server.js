import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudnary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ SAFE START FUNCTION (IMPORTANT)
const startServer = async () => {
    try {
        // DB connect
        await connectDB();
        console.log("Database Connected");

        // Cloudinary connect
        await connectCloudinary();
        console.log("Cloudinary Connected");

        // CORS config
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5174",
            process.env.FRONTEND_URL
        ].filter(Boolean);

        app.use(express.json());
        app.use(cookieParser());

        app.use(
            cors({
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true);

                    const isAllowed =
                        allowedOrigins.includes(origin) ||
                        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
                        /^http:\/\/localhost:\d+$/.test(origin);

                    if (!isAllowed) {
                        return callback(new Error("CORS error"), false);
                    }

                    return callback(null, true);
                },
                credentials: true,
            })
        );

        // Routes
        app.use("/api/user", userRouter);
        app.use("/api/seller", sellerRouter);
        app.use("/api/product", productRouter);
        app.use("/api/cart", cartRoute);
        app.use("/api/address", addressRoute);
        app.use("/api/order", orderRouter);

        // Test route (IMPORTANT)
        app.get("/", (req, res) => {
            res.send("Backend working 🚀");
        });

        // Start server
        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
    }
};

// Run server
startServer();