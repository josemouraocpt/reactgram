import './EditProfile.css';
import { useState, useEffect } from 'react';
import { uploads } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';
import Message from '../../components/Message';

const EditProfile = () => {
	const dispatch = useDispatch();

	const { user, message, error, loading } = useSelector((state) => state.user);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [bio, setBio] = useState('');
	const [previewImage, setPreviewImage] = useState('');

	useEffect(() => {
		dispatch(profile());
	}, [dispatch]);

	useEffect(() => {
		setName(user.name);
		setEmail(user.email);
		setBio(user.bio);
	}, [user]);

	const handleFile = (e) =>{
		const image = e.target.files[0]
		setPreviewImage(image);
		console.log(URL.createObjectURL(image))
		setProfileImage(image);
	};

	const handleSubmit = async(e) => {
		e.preventDefault();

		const user = {
			name,
		 };

			if(bio){
				user.bio = bio;
			};
			if(password){
				user.password = password;
			};
			if(profileImage){
				user.profileImage = profileImage;
			};

			const formData = new FormData();
			
			const userFormData = Object.keys(user).forEach((key) => {formData.append(key, user[key])});

			formData.append("user", userFormData);

			await dispatch(updateProfile(formData));

			setTimeout(() => {
				dispatch(resetMessage());
			}, 2000)
	};

		return (
				<div id='edit-profile'>
					<h2>Edite seus dados</h2>
					<p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
					{(user.profileImage || previewImage) && (
						<img src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`}  alt={user.name} className="profile-image"/>
					)}
					<form onSubmit={handleSubmit}>
					<input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
					<input type="email" placeholder='E-mail' value={email || ""} disabled/>
					<label>
						<span>Imagem do Perfil:</span>
						<input type="file" onChange={handleFile}/>
					</label>
					<label>
						<span>Bio:</span>
						<input type="text" placeholder='Descrição do perfil' value={bio || ""} onChange={(e) => setBio(e.target.value)}/>
					</label>
					<label>
						<span>Alterar senha:</span>
						<input type="password" placeholder='Digite sua nova senha' value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
					</label>
						{!loading && <input type="submit" value='Atualizar'/>}
						{loading && <input type="submit" value='Aguarde...' disabled/>}
						{error && <Message message={error} messageType='error'/>}
						{message && <Message message={message} messageType='success'/>}
					</form>
				</div>
		)
}

export default EditProfile