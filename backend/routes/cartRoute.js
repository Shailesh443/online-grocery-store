import express from "express";
import authUser from "../middleewares/authUser.js";
import { updateCart } from "../controllers/cardController.js";

const cartRoute = express.Router();

cartRoute.post("/update", authUser, updateCart);

export default cartRoute;
