import React, { memo, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Text from '../../atoms/Text/Text';
import { Avatar } from '../../atoms/index';
import classes from './LiveChatBlock.module.scss';
import moment from 'moment';
import ENV_CONFIG from '../../../config';
const io = require('socket.io-client');
const user = JSON.parse(localStorage.getItem('USER')) || {};
const LiveChat = ({chats}) => {
	
	
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
							<Col className='gutter-row' flex={'30px'}>
								<Avatar name={comment.name} style={{fontSize:'20px'}} width={30} height={30} />
							</Col>
							<Col className='gutter-row' flex={'auto'}>
								<Text size={'md'} noMargin weight={600}>
									{comment.name}
								</Text>
								<Text
									size={'sm'}
									noMargin
									theme={comment.name === user?.username ? 'dark' : 'light'}
								>
									<span style={{color:'inherit'}} dangerouslySetInnerHTML={{ __html: comment.comment }}/>
								</Text>
							</Col>
							
							<span
								className={`${classes.time} ${comment.name !== user?.username ? classes.light :  classes.dark}`}
							>
								{/* if time is available, use moment from now */}
								{moment(comment.time).fromNow()}
							</span>
						</Row>
					);
				})}
		</div>
	);
};
export default memo(LiveChat);
