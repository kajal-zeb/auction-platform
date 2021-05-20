import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { Switch, useHistory, withRouter } from 'react-router-dom';
import ENV_CONFIG from '../../../config';
import Logo from '../../atoms/Logo/Logo';
import Text from '../../atoms/Text/Text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../Login';
toast.configure();

const { Content } = Layout;
const { Footer } = Layout;
const VIEW_CONFIG = {
	hold: 'hold',
	enterCode: 'enterCode',
	bid: 'bid',
	wait: 'wait',
};
const EVENT_START_TIME = JSON.parse(localStorage.getItem('USER'))
	? JSON.parse(localStorage.getItem('USER'))?.eventStartTime
	: '';
// const EVENT_START_TIME = "2021-05-20T08:41:10.590Z"
const ParentWrapper = (props) => {
	const [errorMsg, showErrorMsg] = useState(false);
	const [viewConfig, setViewConfig] = useState(VIEW_CONFIG.hold);
	const [showBidBlock, setShowBidBlock] = useState(false);
	const onSelectionChange = (value) => {
		setShowBidBlock(value);
		console.log(showBidBlock);
	};
	useEffect(() => {
		console.log(localStorage.getItem('attendeeId'));
		if (!JSON.parse(localStorage.getItem('attendeeId'))) {
			// let userexternalid = window.location.href //will update once patched to Aventri
			let userexternalid = new URLSearchParams(window.location.search).get(
				'userexternalid',
			);
			console.log('ID > ', userexternalid);
			localStorage.setItem('attendeeId', userexternalid);
		}
		let userData = JSON.parse(localStorage.getItem('USER'));
		if (
			userData &&
			Object.keys(userData).length &&
			userData.id &&
			userData.passphrase
		) {
			axios
				.post(`${ENV_CONFIG.BASE_URL}${API_ENDPOINTS.VERIFY_USER}`, {
					userId: userData.id,
					passphrase: userData.passphrase,
				})
				.then(({ data }) => {
					if (data && data.data) {
						if (
							getDateFormat(new Date(), true) >=
							getDateFormat(EVENT_START_TIME, true)
						) {
							setViewConfig(VIEW_CONFIG.bid);
							// clearInterval(interval);
						} else setViewConfig(VIEW_CONFIG.wait);
						localStorage.setItem('USER', JSON.stringify(data.data));
					}
				});
		} else {
			axios
				.get(
					`${ENV_CONFIG.BASE_URL}${
						API_ENDPOINTS.INITIALIZE_USER
					}?userexternalid=${localStorage.getItem('attendeeId')}`,
				)
				.then(({ data }) => {
					if (data && data.data && Object.keys(data.data).length) {
						console.log('Data > ', data);
						localStorage.setItem('USER', JSON.stringify(data.data));
						if (data.data.isActive) {
							console.log('Active');
							if (
								getDateFormat(new Date(), true) >=
								getDateFormat(EVENT_START_TIME, true)
							) {
								setViewConfig(VIEW_CONFIG.bid);
								// clearInterval(interval);
							} else setViewConfig(VIEW_CONFIG.wait);
							// setViewConfig(VIEW_CONFIG.bid);
						} else {
							console.log('Redirect');
							setViewConfig(VIEW_CONFIG.enterCode);
						}
						// showErrorMsg(false);
					}
					// showErrorMsg(false);
				})
				.catch((e) => {
					console.log('ERR > ', e);
					notify('Uh Oh! Something went wrong.');
					showErrorMsg(true);
				});
		}
	}, []);

	useEffect(() => {
		if (EVENT_START_TIME) {
			console.log(
				getDateFormat(new Date(), true),
				getDateFormat(EVENT_START_TIME, true),
			);
			const interval = setInterval(() => {
				if (
					getDateFormat(new Date(), true) >=
					getDateFormat(EVENT_START_TIME, true)
				) {
					setViewConfig(VIEW_CONFIG.bid);
					clearInterval(interval);
				} else setViewConfig(VIEW_CONFIG.wait);
				return () => {
					clearInterval(interval);
				};
			}, 1000);
		}
	}, [EVENT_START_TIME]);

	const getDateFormat = (date, time = false) => {
		const inputDate = new Date(date);
		let month = String(inputDate?.getMonth() + 1);
		let day = String(inputDate?.getDate());
		const year = String(inputDate?.getFullYear());
		let hours = '';
		let minutes = '';
		let seconds = '';

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		if (time) {
			hours = String(inputDate?.getHours());
			minutes = String(inputDate?.getMinutes());
			seconds = String(inputDate?.getSeconds());
			if (hours.length < 2) hours = '0' + hours;
			if (minutes.length < 2) minutes = '0' + minutes;
			if (seconds.length < 2) seconds = '0' + seconds;
		}

		return `${year}/${month}/${day}${
			time ? ` ${hours}:${minutes}:${seconds}` : ``
		}`;
	};

	const notify = (message) => toast.warning(message);
	const getHoldView = (message) => (
		<div
			style={{
				height: '100vh',
				fontSize: '14px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Logo width={150} height={'auto'} />
			<div style={{marginTop:'20px'}}>
				<Text noMargin size={'md'} spacing={'md'} primaryColor>
					{message}
				</Text>
			</div>
		</div>
	);
	const handleBid = () => {
		if (
			getDateFormat(new Date(), true) >= getDateFormat(EVENT_START_TIME, true)
		) {
			setViewConfig(VIEW_CONFIG.bid);
			// clearInterval(interval);
		} else setViewConfig(VIEW_CONFIG.wait);
	};
	console.log('VIEW > ', viewConfig);
	switch (viewConfig) {
		case VIEW_CONFIG.hold:
			return getHoldView(
				!errorMsg
					? 'Hold tight while we set up the platform...'
					: 'Something went wrong. Try refreshing!',
			);
		case VIEW_CONFIG.enterCode:
			return <Login onFinish={handleBid} />;
		case VIEW_CONFIG.bid:
			return (
				<Layout style={{ height: '100vh' }} id='auction'>
					<Header />
					<Content style={{ height: 'calc(100% - 209px)' }}>
						<Art />
						<div className={classes.liveChatWrapper}>
							<LiveChat />
							<div className={`${showBidBlock ? 'show' : ''} transition-hide`}>
								<Bid onClose={() => onSelectionChange(false)} />
							</div>
						</div>
					</Content>
					<Footer
						className={`${classes.footerStyle} ${classes.footerPosition}`}
						onClick={() => onSelectionChange(!showBidBlock)}
					>
						{/* <Foot openBidBlock={()=>onSelectionChange(!showBidBlock)}/> */}
						PLACE BID
					</Footer>
				</Layout>
			);
		case VIEW_CONFIG.wait:
			return getHoldView("You're in! Please Wait for the auction to begin...");
		default:
			return getHoldView;
	}
	return (
		<>
			<p>BitcoinPizza party failed to load!</p>
		</>
	);
};
export default ParentWrapper;
