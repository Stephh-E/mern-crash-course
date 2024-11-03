// Entry point for the app

import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get("/products", (request, response) => {});

app.listen(8080, () => {
    connectDB();
    console.log("Server started at http://localhost:8080");
});
