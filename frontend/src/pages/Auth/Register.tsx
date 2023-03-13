import './Auth.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { register, reset } from '../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../components/Message';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch(); 
	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = async(e) => {
		e.preventDefault();
		const user = {
			name,
			email,
			password,
			confirmPassword
		};
		dispatch(register(user));
	};

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

		return (
				<div id='register'>
					<h2>ReactGram</h2>
					<p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
					<form onSubmit={handleSubmit}>
						<input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
						<input type="email" placeholder='E-mail'  onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
						<input type="password" placeholder='Senha'  onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
						<input type="password" placeholder='Confirmação de senha'  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
						{!loading && <input type="submit" value='Cadastrar'/>}
						{loading && <input type="submit" value='Aguarde...' disabled/>}
						{error && <Message message={error} messageType='error'/>}
					</form>
					<p>
						Já possui conta? <Link to='/login'>Clique aqui!</Link>
					</p>
				</div>
		)
}

export default Register