import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsBoxArrowRight } from 'react-icons/bs';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
	const { auth } = useAuth();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if(search){
			navigate(`/search?q=${search}`);
		}
		setSearch("");
	};

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/login");
	};
		return (
				<nav id='nav'>
					<Link to="/">ReactGram</Link>
					<form id='search-form' onSubmit={handleSubmit}>
							<BsSearch/>
							<input type="text" placeholder='Pesquisar' value={search || ""} onChange={e => setSearch(e.target.value)}/>
					</form>
					<ul id="nav-links">
						{auth ? (
							<>
								<li>
									<NavLink to="/">
										<BsHouseDoorFill/>
									</NavLink>
								</li>
								{user && (
									<>
									<li>
											<NavLink to={`/users/${user._id}`}>
												<BsFillCameraFill/>
											</NavLink>
									</li>
									<li>
										<NavLink to="/profile">
											<BsFillPersonFill/>
										</NavLink>
									</li>
									<li>
										<span>
											<BsBoxArrowRight onClick={handleLogout}/>
										</span>
									</li>
									</>
								)}
							</>
						): (
							<>
								{" "}
								<li>
									<NavLink to="/login">
										Entrar
									</NavLink>
								</li>			
								<li>
									<NavLink to="/register">
										Cadastrar
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
		);
};

export default Navbar