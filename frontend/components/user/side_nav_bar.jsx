import React from 'react';
import { Link } from 'react-router-dom';

class SideNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.currentUser };
	}

	handleClass(type) {
		const element = document.getElementsByClassName(type)[0];
		const oldChecked = document.getElementsByClassName('checked')[0];
		console.log('element:', element);
		console.log('oldChecked:', oldChecked);
		if (oldChecked) {
			oldChecked.classList.remove('checked');
		}
		element.classList.add('checked');
	}

	render() {
		const { user } = this.state;
		const { username, email, id } = user;

		return (
			<section className='side-nav-bar'>
				<div>
					<h1 className='logo-cont'>
						<div id='picture-logo'>
							<img
								src='https://user-images.githubusercontent.com/75961076/119849262-7b8e3f80-beda-11eb-9f78-f1b5312d08fd.png'
								alt='BigTimeSound Logo'
							/>
						</div>
						<div className='app-name'>BigTimeSound!</div>
					</h1>

					<section className='side-navigation-buttons'>
						<Link
							className='side home checked'
							to={`/users/${id}`}
							onClick={() => this.handleClass('home')}>
							<svg className='svg-home' viewBox='0 0 576 512'>
								<path
									fill='currentColor'
									d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z'></path>
							</svg>
							<div>Home</div>
						</Link>
						<Link
							className='side search'
							to={`/users/${id}/search`}
							onClick={() => this.handleClass('search')}>
							<svg class='svg-search' viewBox='0 0 512 512'>
								<path
									fill='currentColor'
									d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
							</svg>
							<div>Search</div>
						</Link>
						<Link
							className='side library'
							to={`/users/${id}/library`}
							onClick={() => this.handleClass('library')}>
							<svg class='svg-library' viewBox='0 0 576 512'>
								<path
									fill='currentColor'
									d='M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z'></path>
							</svg>
							<div>Your Library</div>
						</Link>
					</section>
				</div>
				<section className='album-cover'>
					<img src='https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg' />
				</section>
			</section>
		);
	}
}

export default SideNavBar;
