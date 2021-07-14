import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<h1>
				<Link to='/' id='picture-logo'>
					<img
						src='https://active-storage-big-time-sound-seeds.s3.amazonaws.com/output-onlinepngtools+(1).png'
						alt='BigTimeSound Logo'
					/>
				</Link>
				<Link to='/'>BigTimeSound!</Link>
			</h1>
		</header>
	);
};

export default Header;
