import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import Login from '../Login';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { useHistory } from 'react-router-dom';
const { Content } = Layout;
const { Footer } = Layout;
const { Text } = Typography;

const ParentWrapper = (props) => {
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showBidBlock, setShowBidBlock] = useState(false);
	const onSelectionChange = (value) => {
		setShowBidBlock(value);
		console.log(showBidBlock);
	};
	useEffect(() => {
		if (!localStorage.getItem('attendeeId')) {
			// let userexternalid = window.location.href //will update once patched to Aventri
			let userexternalid = '119287966';
			localStorage.setItem('attendeeId', userexternalid);
		}
		let userData = localStorage.getItem('USER');
		if (
			userData &&
			Object.keys(userData).length &&
			userData.userId &&
			userData.passphrase
		) {
			axios
				.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.VERIFY_USER}`, {
					userId: userData.userId,
					passsphrase: userData.passphrase,
				})
				.then(({ data }) => {
					if (data && data.data) {
						setIsLoggedIn(true);
						localStorage.setItem('USER', JSON.stringify(data.data));
					}
				});
		} else {
			axios
				.get(
					`${API_ENDPOINTS.BASE_URL}${
						API_ENDPOINTS.INITIALIZE_USER
					}?userexternalid=${localStorage.getItem('attendeeId')}`,
				)
				.then(({ data }) => {
					if (data && data.data && Object.keys(data.data).length) {
						if (data.data.isActive) {
							setIsLoggedIn(true);
						} else history.push('/login');
					}
					localStorage.setItem('USER', JSON.stringify(data.data));
				})
				.catch((e) => alert('Something went wrong!'));
		}
	}, []);
	return (
		<>
			{!isLoggedIn ? (
				<Text>Hold tight while we setup the platform....</Text>
			) : (
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
			)}
		</>
	);
};
export default ParentWrapper;
