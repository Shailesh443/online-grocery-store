import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ ENVIRONMENT VALIDATION
const requiredEnv = [
    "MONGO_URI",
    "JWT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing environment variable: ${key}`);
        process.exit(1);
    }
});

// ✅ SAFE START FUNCTION (IMPORTANT)
const startServer = async () => {
    try {
        // DB connect
        await connectDB();

        // Cloudinary connect
        await connectCloudinary();

        // CORS config
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5174",
            process.env.FRONTEND_URL
        ]
        .filter(Boolean)
        .map(origin => origin.replace(/\/+$/, "").toLowerCase());

        app.use(express.json());
        app.use(cookieParser());

        app.use(
            cors({
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true);

                    const normalizedOrigin = origin.replace(/\/+$/, "").toLowerCase();

                    const isAllowed =
                        allowedOrigins.includes(normalizedOrigin) ||
                        /^http:\/\/127\.0\.0\.1:\d+$/.test(normalizedOrigin) ||
                        /^http:\/\/localhost:\d+$/.test(normalizedOrigin);

                    if (!isAllowed) {
                        console.error(`CORS blocked for origin: ${origin}`);
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

        // Global Error Handler
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({
                success: false,
                message: process.env.NODE_ENV === "production" 
                    ? "Internal Server Error" 
                    : err.message
            });
        });

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

// Run server
startServer();