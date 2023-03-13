import { api, requestConfig } from '../utils/config';

//Fetch user profile
const profile = async(data, token) => {
	const config = requestConfig("GET", data, token);
	try {
		const res = await fetch(`${api}/users/profile`, config);
	
		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	};
};

//Update user
const updateProfile = async(data, token) => {
	const config = requestConfig("PUT", data, token, true);
	try {
		const res = await fetch(`${api}/users/`, config);
	
		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	};
};

//Get user by ID
const getUserById = async(id) => {
	const config = requestConfig("GET");
	try {
		const res = await fetch(`${api}/users/${id}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const userService ={ 
	profile,
	updateProfile,
	getUserById,
};

export default userService;