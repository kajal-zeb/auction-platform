import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scroll-menu';
import Text from '../../atoms/Text/Text';
import Title from '../../atoms/Title';
import classes from './BidBlock.module.scss';
import { Button, Typography } from 'antd';
import Sprite from '../../atoms/Sprite/Sprite';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
const Bid = (props) => {
	const bidOptions = [200, 400, 600];
	const currentBid = 498938;
	// const { Title } = Typography;
	const [currentMessage, setCurrentMessage] = useState(null);
	const [newBid, setnewBid] = useState(currentBid);
	const [incrementer, setIncrementer] = useState(0);
	const [isBidPlaced, setIsBidPlaced] = useState(false);
	const handlePlaceBid = async () => {
		await axios.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PLACE_BID}`, {
			userId: localStorage.getItem('USER').userId,
			username: localStorage.getItem('USER').userId,
			message: currentMessage,
			amount: newBid,
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
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 220,
			key: 12,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 250,
			key: 13,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 250,
			key: 14,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 250,
			key: 15,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
		{
			width: 250,
			key: 16,
			msg: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun`,
		},
	];

	const setMessage = (value) => {
		const updatedValue = currentBid + incrementer;
		setCurrentMessage({
			...value,
			valuemsg: value.msg.replace(
				'_____',
				`<b>${currentBid + incrementer}</b>`,
			),
		});
		console.log({
			valuemsg: value.msg.replace('____', `<b>${updatedValue}</b>`),
		});
		console.log(currentBid + incrementer);
	};
	useEffect(() => {
		if (incrementer && currentMessage != null)
			setMessage({ ...currentMessage });
	}, [incrementer]);

	const animateSuccess = () => {
		setIsBidPlaced(true);
		setTimeout(() => {
			setIsBidPlaced(false);
			props.onClose();
		}, 2000);
	};
	return (
		<div className={`${classes.bidBlockContainer}`}>
			{isBidPlaced ? (
				<div className={classes.success}>
					<span>
						<Sprite id='tick' width={40} height={40} />
					</span>
					<Title
						tag='h2'
						theme='light'
						weight='600'
						spacing={'sm'}
						size={'lg'}
						align={'center'}
					>
						Bid Successful
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
							<input value={currentBid + incrementer} />
							<Sprite id='refresh' width={22} height={16} />
						</div>
					</div>
					<Text align={'center'} size={'md'} spacing={'sm'}>
						~₹500
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
						<Text size={'lg'} spacing={'md'} weight={600} id='message'>
							Choose a message
						</Text>
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
				<a className={classes.back} onClick={props.onClose}>
					<Sprite id='cross' width={20} height={20} />
				</a>
				<a className={classes.confirm} onClick={animateSuccess}>
					CONFIRM
				</a>
			</div>
		</div>
	);
};
export default Bid;
