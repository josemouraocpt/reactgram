import './Home.css';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhotos, like } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

const Home = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { photos, loading } = useSelector((state) => state.photo);

	const clearMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};


	useEffect(() => {
		dispatch(getAllPhotos());
	}, [dispatch]);

	const handleLike = (photo) => {
		dispatch(like(photo._id));
		clearMessage();
	};

	if(loading){
		return <p>Carregando...</p>
	}

		return (
				<div id='home'>
					{photos && photos.map((photo) => (
								<div key={photo._id}>
									<PhotoItem photo={photo}/>
									<LikeContainer handleLike={handleLike} photo={photo} user={user}/>
									<Link className='btn' to={`/photo/${photo._id}`}>Ver Mais</Link>
								</div>
							))}
					{photos && photos.lenght === 0 && (
						<h2 className="no-photos">
							Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>Clique aqui</Link>
						</h2>
					)}			
				</div>
		)
}

export default Home