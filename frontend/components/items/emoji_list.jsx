import React, { Component } from 'react';
import * as emoji from 'emoji-dictionary';

const EmojiList = (props) => {
	const { addEmojiToValue, large } = props;

	return (
		<section
			className='emoji-container'
			id={large ? `large-emoji-container` : ''}>
			<ul className='emoji-list'>
				{emoji.unicode.map((ele, i) => (
					<li key={i} onClick={() => addEmojiToValue(ele)}>
						{ele}
					</li>
				))}
			</ul>
		</section>
	);
};

export default EmojiList;
