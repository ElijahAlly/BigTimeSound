import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<h1>
				<Link to='/' id='picture-logo'>
					<img
						src='https://user-images.githubusercontent.com/75961076/119849262-7b8e3f80-beda-11eb-9f78-f1b5312d08fd.png'
						alt='BigTimeSound Logo'
					/>
				</Link>
				<Link to='/'>BigTimeSound!</Link>
			</h1>
			<div className='header-buttons'>
				<Link to='/signup'>
					<button>Sign Up</button>
				</Link>
				<Link to='/login'>
					<button>Log In</button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
