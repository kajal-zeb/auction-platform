import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import Title from '../Title';
import classes from './Header.module.scss';
import parentClasses from '../../organisms/ParentWrapper/ParentWrapper.module.scss';
import Avatar from '../Avatar/index';
import Logo from '../Logo/Logo';

const Header = ({data}) => {
	const [highestBid, setHighestBid] = useState(null);
    const io = require('socket.io-client');

	// useEffect(() => {
	// 	console.log(this);
	// 	if (localStorage.getItem('currentbid')) {
	// 		// setHighestBid(JSON.parse(localStorage.getItem('currentbid')));
	// 	}
	// }, [JSON.parse(localStorage.getItem('currentbid'))]);
	// if(!data){
	// 	return null
	// }
	return (
		<div>
			<div className={`header`}>
				<div className={`flex ${classes.headerStyle}`}>
					<Logo height={50} width={'auto'} />
					{/* <Text noMargin size={'lg'} weight={600}>
            1 Satoshi = 0.00000001 BTC
          </Text> */}
				</div>
			</div>
			<div className={`text-align-center mt0`}>
				<Text  size={'md'} spacing={'xs'}>
					
					{data&&data.bidAmount?
					<>Current Highest Bid</>
					:null
					}
				</Text>
			</div>
			<div className={`${parentClasses.headerStyle} ${classes.subHeaderStyle}`}>
				<Title tag={'h3'} spacing={'none'} weight={600}>
					{data&&data.bidAmount?
						<>{parseInt(data?.bidAmount)} Satoshi</>
						: <>Loading..</>
					}
					
				</Title>
				<div className={`flex`}>
					{data?.name && (
						<Avatar name={data?.name} isSmall={true}/>
					)}
					<Text noMargin size={'md'} spacing={'md'} weight={600}>
						<span style={{ color: 'var(--white)' }}>
							{data?.name}
						</span>
					</Text>
				</div>
			</div>
		</div>
	);
};
export default Header;
