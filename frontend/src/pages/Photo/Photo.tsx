import './Photo.css';
import { uploads } from '../../utils/config';

import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoById, like, resetMessage, comment } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

const Photo = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { photo, loading, error, message } = useSelector((state) => state.photo);
	const [commentText, setCommentText] = useState("");

	useEffect(() => {
		dispatch(getPhotoById(id));
	}, [dispatch, id]);
	
	const clearMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	const handleLike = (photo) => {
		dispatch(like(photo._id));
		clearMessage();
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		const photoData = {
			id: photo._id,
			comment: commentText
		};
		await dispatch(comment(photoData));
		setCommentText("");
		clearMessage();
	};

	if(loading){
		return <p>Carregando...</p>
	};

	return (
			<div id='photo'>
				<PhotoItem photo={photo}/>
				<LikeContainer photo={photo} user={user} handleLike={handleLike}/>
				<div className="message-container">
					{error && <Message message={error} messageType="error"/>}
					{message && <Message message={message} messageType="success"/>}
				</div>
				<div className="comments">
					{photo.comments && (
						<>
							<h3>Comentários: ({photo.comments.length})</h3>
							<form onSubmit={handleSubmit}>
								<input type="text" placeholder='Insira o seu comentário...' onChange={(e) => setCommentText(e.target.value)} value={commentText || ""}/>
								<input type="submit" value="Enviar" />
							</form>
							{photo.comments.length === 0 && <p>Não há comentários.</p>}
							{photo.comments.map((comment, index) => (
								<div className="comment" key={index}>
									<div className="author">
										{comment.userImage && (
											<img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
										)}
										<Link to={`/users/${comment.userId}`}><p>{comment.userName}</p></Link>
									</div>
									<p>{comment.comment}</p>
								</div>
							))}
						</>
					)}
				</div>
			</div>
	)
}

export default Photo