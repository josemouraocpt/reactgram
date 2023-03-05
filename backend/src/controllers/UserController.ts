import * as dotenv from "dotenv";
dotenv.config();

import User from '../models/User';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
	return jsonwebtoken.sign({ id }, jwtSecret, {
		expiresIn: "7d",
	});
};

//Register user and sing in
const register = async(req, res) => {
	const { name, email, password } = req.body;

	//try find user
	const user = await User.findOne({ email: email });
	if(user){
		res.status(422).json({
			errors: ["Por favor utilize outro e-mail"],
		});
		return;
	};

	//hash the password
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);
	const newUser = await User.create({
		name,
		email,
		password: hashPassword
	});


	if(!newUser){
		res.status(422).json({
			errors: ["Houve um erro, tente mais tarde!"]
		});
		return;
	};

	res.status(201).json({
		_id: newUser._id,
		token: generateToken(newUser._id),
	});
	return;
};

const login = async (req, res) => {
	const { email, password } = req.body;

	//try find user
	const user = await User.findOne({ email: email });
	if(!user){
		res.status(404).json({
			errors: ["Não foi encontrado um usuário associado a este e-mail"],
		});
		return;
	};
	//check if password matches
	if(!(bcrypt.compareSync(password, user.password))){
		res.status(404).json({
			errors: ["O e-mail ou senha digitado não existe"],
		});
		return;
	};
	res.status(200).json({
		_id: user._id,
		profileImage: user.profileImage,
		token: generateToken(user._id),
	})
};

//current logged user
const getCurrentUser = async(req, res) => {
	const user = await req.user;
	res.status(200).json(user);
};

//update an user
const update = async(req, res) => {
	const {name, password, bio} = req.body;

	let profileImage = null;

	if(req.file){
		profileImage = req.file.filename;
	};

	const user = await User.findById(new mongoose.Types.ObjectId(req.user._id)).select("-password");

	if(name){
		user.name = name;
	};


	if(password){
		//hash the password
		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);
		user.password = hashPassword;
	};

	if(profileImage){
		user.profileImage = profileImage;
	};

	if(bio){
		user.bio = bio;
	};

	await user.save();
	
	res.status(200).json(user);
};

//get user by id
const getUserById = async(req, res) => {
	const {id} = req.params;
	try {
		const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");
		if(!user){
			res.status(404).json({errors: ["Usuário não encontrado"]});
			return;
		};
		res.status(200).json(user);
	} catch (error) {
		res.status(422).json({errors: ["Usuário não encontrado"]});
		return;
	};
}

export { register, login, getCurrentUser, update, getUserById };