import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Text from '../../atoms/Text/Text';
import { Avatar } from '../../atoms/index';
import classes from './LiveChatBlock.module.scss';
import ENV_CONFIG from '../../../config';
import moment from 'moment';
const user = JSON.parse(localStorage.getItem('USER')) || {};
const io = require('socket.io-client');
const LiveChat = (props) => {
	const [chats, setChats] = useState([]);
	useEffect(() => {
		const socket = io(ENV_CONFIG.BASE_URL);
		socket.on('HighestBid', (data) => {
			localStorage.setItem('currentbid', JSON.stringify(data));
			let formattedData = {
				name: data.highestBidderName,
				comment: data.bidMessage,
				time: data.bidTime,
				bidAmount: data.currentHighestBid,
			};
			setChats((prev) => [...prev, formattedData]);
		});
	}, []);
	return (
		<div className={`${classes.comments}`}>
			{chats &&
				chats.length > 0 &&
				[
					...new Map(
						chats.map((item) => [JSON.stringify(item), item]),
					).values(),
				].map((comment, index) => {
					return (
						<Row
							key={index}
							gutter={11}
							className={`${classes.chatItem} ${
								comment.name === user?.username ? classes.selected : undefined
							}`}
						>
							<Col className='gutter-row' flex={'52px'}>
								<Avatar name={comment.name} width={40} height={40} />
							</Col>
							<Col className='gutter-row' flex={'auto'}>
								<Text size={'md'} noMargin weight={600}>
									{comment.name}
								</Text>
								<Text
									size={'md'}
									noMargin
									theme={comment.name !== user?.username ? 'gray' : undefined}
								>
									{comment.comment}
								</Text>
							</Col>
							<Col className='gutter-row' flex={'68px'}>
								<Text
									size={'sm'}
									noMargin
									align={'right'}
									theme={comment.name !== user?.username ? 'gray' : undefined}
								>
									{/* if time is available, use moment from now */}
									{moment(comment.time).fromNow()}
								</Text>
							</Col>
						</Row>
					);
				})}
		</div>
	);
};
export default LiveChat;
