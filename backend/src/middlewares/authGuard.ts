import * as dotenv from "dotenv";
dotenv.config();

import User from "../models/User";
import jsonwebtoken from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;


const authGuard = async(req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader;
	if(!token){
		res.status(401).json({ errors: ["Acesso negado!"]});
		return;
	};
	try {
		const verified = jsonwebtoken.verify(token, jwtSecret);
		req.user = await User.findById(verified.id).select("-password");

		next();
		return;
	} catch (error) {
		console.log('error', error)
		res.status(401).json({errors: ["Token Inválido!"]});
		return;
	};
};

export { authGuard };