// Entry point for the app

import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.get("/api/products", async (request, response) => {
    try{
        const products = await Product.find({});
        response.status(200).json({ success: true, data: products });
    } catch (error) {
      console.log("error in fetching products", error.message);
      response.status(500).json({ success:false, message: "Server Error" });

    }
});

app.post("/api/products", async  (request, response) => {
    const product = request.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return response.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        response.status(201).json({ success:true, data: newProduct});
    }   catch (error) {
        console.error("Error in Create product:", error.message);
        response.status(500).json({ success: false, message: "Server Error"});
    }
});

app.put("/api/products/:id", async (request, response) => {
    const { id } = request.params;

    const product = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Invalid Product Id"});
    }

    try{
       const updatedProduct =  await Product.findByIdAndUpdate(id, product,{new:true});
       response.status(200).json({ success: true, data: updatedProduct });
    } catch(error){
      response.status(500).json({ sucess: false, message: "Server Error " });
    }
});

app.delete("/api/products/:id", async (request, response) => {
    const {id} = request.params

    try {
    await Product.findByIdAndDelete(id);
    reponse.status(200).json({success: true, message: "Product deleted"});
    }catch (error) {
    console.log("error in deleting product", error.message);
    response.status(404).json({ success:false, message: "Product not found" });
    }
});

app.listen(8080, () => {
    connectDB();
    console.log("Server started at http://localhost:8080");
});

