import { api, requestConfig } from '../utils/config';

//Register
const register = async(data) => {
	const config = requestConfig("POST", data);
	try {
		const res = await fetch(`${api}/users/register`, config);
		
		const data = await res.json();

		if(data){
			localStorage.setItem("user", JSON.stringify(data)); 
		};
		
		return data;
	} catch (error) {
		console.log(error);
	};
};

//Login
const login = async(data) => {
	const config = requestConfig("POST", data);
	try {
		const res = await fetch(`${api}/users/login`, config);
		
		const data = await res.json();

		if(data){
			localStorage.setItem("user", JSON.stringify(data)); 
		};
		
		return data;
	} catch (error) {
		console.log(error);
	};
};

//Logout
const logout = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	login,
	logout,
};

export default authService;