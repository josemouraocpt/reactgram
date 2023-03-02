import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async() => {
	try {
		const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j2hfjzv.mongodb.net/?retryWrites=true&w=majority`);
		console.log("Connected to Database");
		return dbConn;
	} catch (error) {
		console.error(error);
	}
};
conn();

export {conn}