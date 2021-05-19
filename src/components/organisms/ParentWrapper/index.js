import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import Login from '../Login/Login';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
const { Content } = Layout;
const { Footer } = Layout;

const ParentWrapper = (props) => {
	const isLoggedIn = false;
	const [showBidBlock, setShowBidBlock] = useState(false);
	const [userExternalId, setuserExternalId] = useState('');
	const [user, setUser] = useState({});
	const onSelectionChange = (value) => {
		setShowBidBlock(value);
		console.log(showBidBlock);
	};
	useEffect(() => {
		axios
			.get(`${API_ENDPOINTS.BASE_URL}API_ENDPOINTS.INITIALIZE_USER/${userExternalId}`)
			.then(({ data }) => {
				if (data && data.data) {
					setUser(data.data);
					localStorage.setItem(
						'USER',
						JSON.stringify({
							username: data.data.username,
						}),
					);
				}
			});
	}, []);
	return (
		<>
			{!isLoggedIn ? (
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
			) : (
				<Login />
			)}
		</>
	);
};
export default ParentWrapper;
