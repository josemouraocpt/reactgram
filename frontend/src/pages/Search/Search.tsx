import './Search.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { search } from '../../slices/photoSlice';


const Search = () => {
	const dispatch = useDispatch();
	const query = useQuery();
	const searchParam = query.get("q");
	const { user } = useSelector((state) => state.auth);
	const { photos, loading } = useSelector((state) => state.photo);

	const clearMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	useEffect(() => {
		dispatch(search(searchParam));
	}, [dispatch, searchParam]);

	const handleLike = (photo) => {
		dispatch(like(photo._id));
		clearMessage();
	};
	
	if(loading){
		return <p>Carregando...</p>
	};

		return (
				<div id='search'>
					<h2>Você está buscando por: {searchParam}</h2>
					{photos && photos.map((photo) => (
						<div key={photo._id}>
						<PhotoItem photo={photo}/>
						<LikeContainer handleLike={handleLike} photo={photo} user={user}/>
						<Link className='btn' to={`/photo/${photo._id}`}>Ver Mais</Link>
					</div>
					))}
					{photos && photos.lenght === 0 && (
						<h2 className="no-photos">Não foram encontrados resultados para a sua busca...</h2>
					)}
				</div>
		)
}

export default Search