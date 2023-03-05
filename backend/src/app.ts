import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import * as path from "path";
import cors from "cors";

const app = express();

const port = process.env.PORT;

//config form data and json response
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//solve CORS
app.use(cors({ credentials : true, origin: "http://localhost:3000" }));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//db connection
import { conn } from "./config/db";
conn();

//routes
import  { router } from './routes/router';
import { dirname } from "path";
app.use(router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});