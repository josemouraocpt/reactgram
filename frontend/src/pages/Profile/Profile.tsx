import './Profile.css';
import { uploads } from '../../utils/config';
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
//icons
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

//redux
import { getUserById } from '../../slices/userSlice';
import { insertPhoto, resetMessage, getUserPhotosById, deletePhoto, updatePhoto } from '../../slices/photoSlice';

//hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { user, loading } = useSelector((state) => state.user);
	const { user: userAuth } = useSelector((state) => state.auth);
	const { photos, loading: photoLoading, message: photoMessage, error: errorPhoto } = useSelector((state) => state.photo);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editImage, setEditImage] = useState("");
	const [editId, setEditId] = useState("");

	const newPhotoForm = useRef();
	const editPhotoForm = useRef();

	const clearMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	const showOrHideForms = () => {
		newPhotoForm.current.classList.toggle("hide");
		editPhotoForm.current.classList.toggle("hide");
	};

	useEffect(() => {
		dispatch(getUserById(id));
		dispatch(getUserPhotosById(id));
	}, [dispatch, id]);

	const handleFile = (e) =>{
		const image = e.target.files[0]
		setImage(image);
	};

	const handleDelete = async(id) => {
		await dispatch(deletePhoto(id));
		clearMessage()
	};

	const handleEdit = (data) => {
		if(editPhotoForm.current.classList.contains("hide")){
			showOrHideForms();
		};
		setEditId(data._id);
		setEditTitle(data.title);
		setEditImage(data.image); 
	};

	const handleCancelEdit = () => {
		showOrHideForms();
	};

	const handleUpdate = async(e) => {
		e.preventDefault();
		
		const photoData = {
			title: editTitle,
			id: editId
		};

		await dispatch(updatePhoto(photoData));

		clearMessage(); 
	};

	const handleSubmit = async(e) => {

		e.preventDefault();

		const data = {
			title,
			image
		};

		const formData = new FormData();
			
		const photoFormData = Object.keys(data).forEach((key) => {formData.append(key, data[key])});

		formData.append("photo", photoFormData);

		await dispatch(insertPhoto(formData));

		clearMessage();

	};

	if(loading){
		return <p>Carregando...</p>
	};

		return (
				<div id='profile'>
					<div className="profile-header">
						{user.profileImage && ( <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} /> )}
						<div className="profile-description">
							<h2>{user.name}</h2>
							<p>{user.bio}</p>
						</div>
					</div>
					{id == userAuth._id && (
						<>
							<div className="new-photo" ref={newPhotoForm}>
								<h3>Compartilhe algum momento seu: </h3>
								<form onSubmit={handleSubmit}>
									<label>
										<span>Título para foto:</span>
										<input type="text" placeholder='Insira um título' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
									</label>
									<label>
										<span>Imagem:</span>
										<input type="file" onChange={handleFile}/>
									</label>
									{!loading && <input type="submit" value='Postar'/>}
									{loading && <input type="submit" value='Aguarde...' disabled/>}
									{errorPhoto && <Message message={errorPhoto} messageType='error'/>}
									{photoMessage && <Message message={photoMessage} messageType='success'/>}
								</form>
							</div>
							<div className='edit-photo hide' ref={editPhotoForm}>
								<p>Editando: </p>
								{editImage && (
									<img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
								)}
								<form onSubmit={handleUpdate}>
									<input type="text" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
									<input type="submit" value='Atualizar'/>
									<button className='cancel-btn' onClick={handleCancelEdit}>Cancelar</button>
									{errorPhoto && <Message message={errorPhoto} messageType='error'/>}
									{photoMessage && <Message message={photoMessage} messageType='success'/>}
								</form>
							</div>
						</>
					)}
					<div className="user-photos">
						<h2>Fotos Publicadas: </h2>
						<div className="photos-container">
							{photos && photos.map((photo, index) => (
								<div className='photo' key={photo._id}>
									{photo.image && (
										<img src={`${uploads}/photos/${photo.image}`} alt={photo.title} key={index}/>
									)}
									{id === userAuth._id ? (
										<div className='actions'>
											<Link to={`/photo/${photo._id}`}><BsFillEyeFill/></Link>
											<BsPencilFill onClick={() => handleEdit(photo)}/>
											<BsXLg onClick={() => handleDelete(photo._id)}/>
										</div>
									): 
										<Link to={`/photo/${photo._id}`} className="link">Ver</Link>
									}
								</div>
							))}
						</div>
						{photos.lenght === 0 && <p>Ainda não há fotos publicas.</p>}
					</div>
				</div>
		)
}

export default Profile