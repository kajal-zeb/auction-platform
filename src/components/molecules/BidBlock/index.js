import React, { useEffect, useState } from 'react';
import Text from '../../atoms/Text/Text';
import Title from '../../atoms/Title';
import classes from './BidBlock.module.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Sprite from '../../atoms/Sprite/Sprite';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import ENV_CONFIG from '../../../config';

const Bid = (props) => {
	const [bidOptions, setBidOptions] = useState([]);
	const [currentBid, setCurrentBid] = useState(null);
	// const { Title } = Typography;
	const [currentMessage, setCurrentMessage] = useState(null);
	const [newBid, setnewBid] = useState(null);
	const [loading, setLoading] = useState(false);
	const [incrementer, setIncrementer] = useState(0);
	const [isBidPlaced, setIsBidPlaced] = useState(false);
	const [bidPlacedMessage, setBidPlacedMessage] = useState('');
	const handlePlaceBid = async () => {
		if (!currentMessage) {
			return;
		}
		setLoading(true);
		await axios
			.post(
				`${ENV_CONFIG.BASE_URL}${API_ENDPOINTS.PLACE_BID}`,
				/* set user name, user id here */
				{
					userId: 1,
					username: 'Kajal',
					message: currentMessage.valuemsg
						.replace('<b>', '')
						.replace('</b>', ''),
					amount: newBid,
				},
			)
			.then(({ data }) => {
				if (data && data.error === '0' && data.message === 'ok') {
					setBidPlacedMessage(data.data);
				} else if (data && data.error === '') {
					setBidPlacedMessage(data.message);
				}
				setIncrementer(0);
				setLoading(false);
				setIsBidPlaced(true);
			})
			.catch((e) => {
				setLoading(false);
				setIncrementer(0);
				setBidPlacedMessage('Unable to place bid');
				setIsBidPlaced(true);
			});
	};
	// const list = [
	//   {key: `"Kitna inaam rakhi hai sarkar hum par? Sardar pure _____ Satoshi”`,}
	// ];
	// list of items
	const list1 = [
		{
			width: 250,
			key: 1,
			msg: `"Kitna inaam rakhi hai sarkar hum par? Sardar pure _____ Satoshi”`,
		},
		{
			width: 250,
			key: 2,
			msg: `"_____ Satoshi Bitcoin ki keemat tume kya jaano Ramesh babu!”`,
		},
		{
			width: 250,
			key: 3,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},

		{
			width: 260,
			key: 4,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 220,
			key: 5,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 220,
			key: 6,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 220,
			key: 7,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 200,
			key: 8,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
	];
	const list2 = [
		{
			width: 260,
			key: 9,
			msg: `"Kitna inaam rakhi hai sarkar hum par? Sardar pure _____ Satoshi”`,
		},
		{
			width: 250,
			key: 10,
			msg: `"_____ Satoshi Bitcoin ki keemat tume kya jaano Ramesh babu!”`,
		},
		{
			width: 220,
			key: 11,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
		{
			width: 220,
			key: 12,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
		{
			width: 250,
			key: 13,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
		{
			width: 250,
			key: 14,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
		{
			width: 250,
			key: 15,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
		{
			width: 250,
			key: 16,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun. _____`,
		},
	];

	const setMessage = (value) => {
		setCurrentMessage({
			...value,
			valuemsg: value?.msg.replace(
				'_____',
				`<b>${currentBid + incrementer}</b>`,
			),
		});
		setnewBid(currentBid + incrementer);
	};
	useEffect(() => {
		if (incrementer && currentMessage != null)
			setMessage({ ...currentMessage });
	}, [incrementer]);

	useEffect(() => {
		if (isBidPlaced) {
			setTimeout(() => setIsBidPlaced(false), 3000);
		}
	}, [isBidPlaced]);

	useEffect(() => {
		determineCurrentBid();
		if (JSON.parse(localStorage.getItem('currentbid'))['bidBracket']) {
			setBidOptions(
				JSON.parse(localStorage.getItem('currentbid'))['bidBracket'],
			);
		}
	}, [localStorage.getItem('currentbid')]);

	const determineCurrentBid = () => {
		if (
			parseFloat(
				JSON.parse(localStorage.getItem('currentbid'))['currentHighestBid'],
			)
		) {
			setCurrentBid(
				parseFloat(
					JSON.parse(localStorage.getItem('currentbid'))['currentHighestBid'],
				),
			);
		}
	};

	return (
		<div className={`${classes.bidBlockContainer}`}>
			{isBidPlaced ? (
				<div className={classes.success}>
					<span>
						<Sprite
							id={bidPlacedMessage === 'Success' ? 'tick' : 'cancel'}
							width={40}
							height={40}
						/>
					</span>
					<Title
						tag='h2'
						theme='light'
						weight='600'
						spacing={'sm'}
						size={'lg'}
						align={'center'}
					>
						{bidPlacedMessage}
					</Title>
				</div>
			) : null}
			<div>
				<div>
					<Title
						tag='h2'
						theme='orange'
						weight='600'
						spacing={'sm'}
						size={'lg'}
						align={'center'}
					>
						{incrementer === 0 ? 'Place' : ''} Your Bid
					</Title>
					<div className={classes.newBid}>
						<div className={classes.inputWrapper}>
							<input value={currentBid + incrementer} disabled />
							<Sprite
								id='refresh'
								width={30}
								height={25}
								onClick={determineCurrentBid}
							/>
						</div>
					</div>
					<Text align={'center'} size={'md'} spacing={'sm'}>
						~₹{(newBid * 0.04052356).toFixed(2)}
					</Text>
				</div>
				<div className={'pad-all-10 flex'}>
					{bidOptions.map((option, index) => {
						return (
							<span
								key={index}
								className={`${classes.bidOptions} ${
									incrementer == option ? classes.selected : ''
								}`}
								onClick={() => setIncrementer(option)}
							>
								+{option}
							</span>
						);
					})}
				</div>
				<hr
					style={{ width: '30%', margin: '20px auto', borderColor: '#aaa' }}
				/>
				<div className={`text-align-center`}>
					{currentMessage ? (
						<>
							<Text weight={600} size={'lg'} spacing={'xs'}>
								Your message
							</Text>
							<Text size={'md'} spacing={'md'} noMargin id='message'>
								<span
									dangerouslySetInnerHTML={{ __html: currentMessage.valuemsg }}
								></span>
							</Text>
						</>
					) : (
						<>
							<Text size={'lg'} spacing={'md'} weight={600} id='message'>
								Choose a message
							</Text>
							<Text
								size={'md'}
								spacing={'md'}
								weight={600}
								noMargin
								id='message'
							>
								<span style={{ color: 'var(--primary-color)' }}>
									Choose a message to place bid!
								</span>
							</Text>
						</>
					)}
				</div>
			</div>
			<div className={`${classes.oneLiner}`}>
				<div className={classes.lineRow}>
					{list1.map((item, index) => {
						return (
							<div
								key={index}
								className={`${classes.listItem} ${
									currentMessage && currentMessage.key === item.key
										? classes.selectedLiner
										: ''
								}`}
								style={{ minWidth: item.width + 'px' }}
								onClick={() => setMessage(item)}
							>
								<Text noMargin spacing={'md'} size={'md'}>
									{item.msg}
								</Text>
							</div>
						);
					})}
				</div>
				<div className={classes.lineRow}>
					{list2.map((item, index) => {
						return (
							<div
								key={index}
								className={`${classes.listItem} ${
									currentMessage && currentMessage.key === item.key
										? classes.selectedLiner
										: ''
								}`}
								style={{ minWidth: item.width + 'px' }}
								onClick={() => setMessage(item)}
							>
								<Text noMargin spacing={'md'} size={'md'}>
									{item.msg}
								</Text>
							</div>
						);
					})}
				</div>
			</div>
			<div className={classes.bottomButtons}>
				<>
					{!loading ? (
						<a className={classes.back} onClick={props.onClose}>
							<Sprite id='cross' width={20} height={20} />
						</a>
					) : null}
					<a className={classes.confirm} onClick={handlePlaceBid}>
						{!loading ? (
							'CONFIRM'
						) : (
							<Spin
								indicator={
									<LoadingOutlined
										style={{ fontSize: '24px', color: 'var(--bg-color)' }}
									/>
								}
							/>
						)}
					</a>
				</>
			</div>
		</div>
	);
};
export default Bid;
