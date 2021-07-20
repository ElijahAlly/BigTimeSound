import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendVolume } from '../../actions/currently_playing';
import { addForwardPath, removeBackPath } from '../../actions/path_actions';

class VolumeControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			muted: props.volume === 0,
		};

		this.handleVolume = this.handleVolume.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.handleQueueClick = this.handleQueueClick.bind(this);
	}

	componentDidMount() {
		const queue = document.getElementsByClassName('queue-btn')[0];
		window.addEventListener('hashchange', () => {
			if (
				Array.from(queue.classList).includes('active-green') &&
				this.props.history.location.pathname !==
					`/users/${this.props.userId}/queue`
			) {
				queue.classList.remove('active-green');
			}
		});
	}

	handleQueueClick() {
		const queue = document.getElementsByClassName('queue-btn')[0];

		if (
			this.props.history.location.pathname ===
			`/users/${this.props.userId}/queue`
		) {
			queue.classList.remove('active-green');
			this.props.addForwardPath();
			this.props.removeBackPath();
			this.props.history.goBack();
			return;
		}

		queue.classList.add('active-green');
		this.props.history.push(`/users/${this.props.userId}/queue`);
	}

	handleVolume(e) {
		this.props.sendVolume(e.target.value);
		const muted = e.target.value === '0' ? true : false;

		this.setState({
			muted,
		});
	}

	toggleMute() {
		if (this.state.muted) {
			this.setState({muted: false})
			this.props.sendVolume(0.7);
		} else {
			this.setState({muted: true})
			this.props.sendVolume(0);
		}
	}

	shouldComponentUpdate(nextProps) {
		if (
			nextProps.volume !== this.props.volume ||
			this.props.history.location.pathname !==
				nextProps.history.location.pathname
		)
			return true;
		return false;
	}

	render() {
		const { volume, audio } = this.props;
		if (audio && audio.controls) audio.volume = volume;

		let high = (
			<svg
				onClick={() => this.toggleMute()}
				role='presentation'
				height='16'
				width='16'
				aria-label='Volume high'
				id='volume-icon'
				viewBox='0 0 16 16'
				fill='currentColor'>
				<path d='M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z'></path>
			</svg>
		);

		let med = (
			<svg
				onClick={() => this.toggleMute()}
				role='presentation'
				height='16'
				width='16'
				aria-label='Volume medium'
				id='volume-icon'
				viewBox='0 0 16 16'
				fill='currentColor'>
				<path d='M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z'></path>
			</svg>
		);

		let low = (
			<svg
				onClick={() => this.toggleMute()}
				role='presentation'
				height='16'
				width='16'
				aria-label='Volume low'
				id='volume-icon'
				viewBox='0 0 16 16'
				fill='currentColor'>
				<path d='M10.04 5.984l.658-.77q.548.548.858 1.278.31.73.31 1.54 0 .54-.144 1.055-.143.516-.4.957-.259.44-.624.805l-.658-.77q.825-.865.825-2.047 0-1.183-.825-2.048zM0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302z'></path>
			</svg>
		);

		let volumeBtn = (
			<svg
				onClick={() => this.toggleMute()}
				role='presentation'
				height='16'
				width='16'
				aria-label='Volume off'
				id='volume-icon'
				viewBox='0 0 16 16'
				fill='currentColor'>
				<path d='M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z'></path>
			</svg>
		);

		if (volume > 0 && volume <= 0.3) {
			volumeBtn = low;
		} else if (volume > 0.3 && volume <= 0.7) {
			volumeBtn = med;
		} else if (volume > 0.6) {
			volumeBtn = high;
		}

		return (
			<>
				<i
					className='fas fa-stream queue-btn'
					onClick={() => this.handleQueueClick()}></i>
				{volumeBtn}
				<input
					id='volume-control'
					value={volume}
					onChange={this.handleVolume}
					type='range'
					min='0'
					step='0.02'
					max='1'
					fill='currentColor'
				/>
			</>
		);
	}
}

const mSTP = ({ ui, session }, ownProps) => ({
	userId: session.currentUser,
	audio: ui.currentlyPlaying.audio,
	volume: ui.currentlyPlaying.volume,
});

const mDTP = (dispatch) => ({
	sendVolume: (volume) => dispatch(sendVolume(volume)),
	removeBackPath: () => dispatch(removeBackPath()),
	addForwardPath: () => dispatch(addForwardPath()),
});

export default withRouter(connect(mSTP, mDTP)(VolumeControl));
