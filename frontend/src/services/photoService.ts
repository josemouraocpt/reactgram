import { api, requestConfig } from '../utils/config';

//insert photo
const insertPhoto = async(data, token) => {
	const config = requestConfig("POST", data, token, true);
	try {
		const res = await fetch(`${api}/photos/`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error)
	}
};

//get user photos
const getUserPhotos = async(id) => {
	const config = requestConfig("GET");
	try {
		const res = await fetch(`${api}/photos/user/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const deletePhoto = async(id, token) => {
	const config = requestConfig("DELETE", null, token);
	try {
		const res = await fetch(`${api}/photos/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//update photo
const updatePhoto = async(id, data, token) => {
	const config = requestConfig("PUT", data, token);
	try {
		const res = await fetch(`${api}/photos/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//get a photo by id
const getPhotoById = async(id, token) => {
	const config = requestConfig("GET", null, token);
	try {
		const res = await fetch(`${api}/photos/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//like
const like = async(id, token) => {
	const config = requestConfig("PUT", null, token);
	try {
		const res = await fetch(`${api}/photos/like/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//comment
const comment = async(id, data, token) => {
	const config = requestConfig("PUT", data, token);
	try {
		const res = await fetch(`${api}/photos/comment/${id}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//get allphotos
const getAllPhotos = async(token) => {
	const config = requestConfig("GET", null, token);
	try {
		const res = await fetch(`${api}/photos/`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const search = async(query, token) => {
	const config = requestConfig("GET", null, token);
	try {
		const res = await fetch(`${api}/photos/search?q=${query}`, config);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const photoService = {
	insertPhoto,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
	getPhotoById,
	like,
	comment,
	getAllPhotos,
	search,
};

export default photoService;