import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import Title from '../Title';
import classes from './Header.module.scss';
import parentClasses from '../../organisms/ParentWrapper/ParentWrapper.module.scss';
import Avatar from '../Avatar/index';
import Logo from '../Logo/Logo';

const Header = (props) => {
	const [highestBid, setHighestBid] = useState(null);

	useEffect(() => {
		if (localStorage.getItem('currentbid')) {
			setHighestBid(JSON.parse(localStorage.getItem('currentbid')));
		}
	}, [JSON.parse(localStorage.getItem('currentbid'))]);

	return (
		<div>
			<div className={`pad-all-10`}>
				<div className={`flex ${classes.headerStyle}`}>
					<Logo height={50} width={'auto'} />
					{/* <Text noMargin size={'lg'} weight={600}>
            1 Satoshi = 0.00000001 BTC
          </Text> */}
				</div>
			</div>
			<div className={`text-align-center`}>
				<Text noMargin size={'md'} spacing={'md'}>
					Highest Bid
				</Text>
			</div>
			<div className={`${parentClasses.footerStyle} ${classes.subHeaderStyle}`}>
				<Title tag={'h2'} spacing={'none'} weight={600}>
					{highestBid?.currentHighestBid} S
				</Title>
				<div className={`flex`}>
					{highestBid?.highestBidderName && (
						<Avatar name={highestBid?.highestBidderName} />
					)}
					<Text noMargin size={'md'} spacing={'md'} weight={600}>
						<span style={{ color: 'var(--white)' }}>
							{highestBid?.highestBidderName}
						</span>
					</Text>
				</div>
			</div>
		</div>
	);
};
export default Header;
