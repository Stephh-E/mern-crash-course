// Entry point for the app

import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

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

app.delete("/api/products/:id", async (request, response) => {
    const {id} = request.params
    console.log("id", id);
});



app.listen(8080, () => {
    connectDB();
    console.log("Server started at http://localhost:8080");
});

