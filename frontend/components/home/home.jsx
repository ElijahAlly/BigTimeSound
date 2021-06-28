import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

const Home = (props) => {
	return ( 
		<>
			<Header />
			<div className='background'>
				<p>BIGTIMESOUND PREMIUM</p>
				<h1>Get 3 months of Premium for free</h1>
				<h4>
					Enjoy ad-free music, offline listening, and more. Cancel anytime.
				</h4>
				<Link to='/signup'>SIGN UP NOW</Link>
			</div>
		</>
	);
}
 

export default Home;
