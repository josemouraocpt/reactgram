import Photo from "../models/Photo";
import mongoose from "mongoose";
import User from "../models/User";


//insert photo, related an user
const insertPhoto = async(req, res) => {
	const {title} = req.body;
	const image = req.file.filename;
	const reqUser = req.user;

	const user = await User.findById(reqUser._id);

	const newPhoto = await Photo.create({
		image,
		title,
		userId: user?._id,
		userName: user?.name,
	});

	if(!newPhoto){
		res.status(422).json({errors: ["Houve um problema, tente novamente mais tarde."]});
		return;
	};

	res.status(201).json(newPhoto);
};

//remove photo
const deletePhoto = async(req, res) => {
	const {id} = req.params;
	const reqUser = req.user;
	console.log('reqUser', reqUser)

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
		console.log('photo', photo)

		if(!photo){
			res.status(404).json({errors: ["Foto não encontrada"]});
			return;
		};
	
		if(!photo?.userId.equals(reqUser._id)){
			res.status(422).json({errors: ["Houve um problema, tente novamente mais tarde."]});
			return;	
		};

		await Photo.findByIdAndDelete(photo?._id);
		
		res.status(200).json({
			id: photo?._id,
			message: "Foto excluída com sucesso.",
		});
	} catch (error) {
		res.status(422).json({errors: ["Foto não encontrada."]});
		return;	
	};
};

//get all
const getAllPhotos = async(req, res) => {
	const allPhotos = await Photo.find({}).sort([["createdAt", -1]]).exec();

	res.status(200).json(allPhotos);
};

//get user related photos
const getPhotosByUserId = async(req, res) => {
	const {id} = req.params;
	const userPhotos = await Photo.find({ userId: id }).sort([["createdAt", -1]]).exec();
	res.status(200).json(userPhotos);
};

//get photo by id
const getPhotoById = async(req, res) => {
	const {id} = req.params;
	const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

	if(!photo){
		res.status(422).json({errors: ["Foto não encontrada."]});
		return;
	};

	res.status(200).json(photo);
};

//update photo
const updatePhotoById = async(req, res) => {
	const {id} = req.params;
	const {title} = req.body;
	const reqUser = req.user;

	const photo = await Photo.findById(id);

	if(!photo){
		res.status(404).json({errors: ["Foto não encontrada."]});
		return;
	};

	if(!photo?.userId.equals(reqUser._id)){
		res.status(422).json({errors: ["Houve um problema, tente novamente mais tarde."]});
		return;	
	};

	if(title){
		photo.title = title;
	};

	await photo.save();

	res.status(200).json( {photo, message: "Foto atualizada com sucesso" });
};

//like function
const like = async(req, res) => {
	const {id} = req.params;
	const reqUser = req.user;
	const photo = await Photo.findById(id);

	if(!photo){
		res.status(404).json({errors: ["Foto não encontrada."]});
		return;
	};

	if(photo.likes.includes(reqUser._id)){
		res.status(422).json({errors: ["Você já curtiu essa foto."]});
		return;	
	};

	photo.likes.push(reqUser._id);

	await photo.save();

	res.status(200).json({
		photoId: id,
		userId: reqUser._id,
		message: "A foto foi curtida"
	});
};

//commment photo
const comment = async(req, res) => {
	const {id} = req.params;
	const {comment} = req.body;
	const reqUser = req.user;
	const user = await User.findById(reqUser._id);
	const photo = await Photo.findById(id);

	if(!photo){
		res.status(404).json({errors: ["Foto não encontrada."]});
		return;
	};

	const userComment = {
		comment,
		userName: user.name,
  userImage: user.profileImage,
  userId: user._id,
	};

	photo.comments.push(userComment);

	await photo.save();

	res.status(200).json({
		comment: userComment,
		message: "O comentário foi incluido"
	});
};

//find a photo
const searchPhotos = async(req, res) => {
	const { q } = req.query;
	const photos = await Photo.find({title: new RegExp(q, "i")}).exec();
	res.status(200).json(photos);
}

export { insertPhoto, deletePhoto, getAllPhotos, getPhotosByUserId, getPhotoById, updatePhotoById, like, comment, searchPhotos };