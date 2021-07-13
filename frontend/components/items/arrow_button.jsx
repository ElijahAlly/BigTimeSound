import React from 'react';

const ArrowButton = (props) => {

	return (
		<svg
			fill='currentColor'
			height='24'
			role='img'
			width='24'
			viewBox='0 0 24 24'
			className={props.classname}
			onClick={() => props.action()}>
			<polygon points='7.96,21.151 7.311,20.39 16.865,12.229 7.311,4.069 7.96,3.309 18.405,12.229 '></polygon>
		</svg>
	);
};

export default ArrowButton;
