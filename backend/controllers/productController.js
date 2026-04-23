import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files ?? [];

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// productList : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get single product : /api/product/id?id=<productId>
export const productById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.json({ success: false, message: "Product id is required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// product stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
