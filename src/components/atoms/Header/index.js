import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import Title from '../Title';
import classes from './Header.module.scss';
import parentClasses from '../../organisms/ParentWrapper/ParentWrapper.module.scss';
import Avatar from '../Avatar/index';
import Logo from '../Logo/Logo';
import Countdown from 'react-countdown';
 
const Header = ({data,countdownEnds}) => {
	const [highestBid, setHighestBid] = useState(null);
    const io = require('socket.io-client');
	console.log(data);
	
	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
		  // Render a completed state
		  return <p>hogya</p>;
		} else {
		  // Render a countdown
		  return <span>{hours}:{minutes}:{seconds}</span>;
		}
	  };
	return (
		<div>
			<div className={`header`}>
				<div className={`flex ${classes.headerStyle}`}>
					<Logo height={50} width={'auto'} />
					{/* <Text noMargin size={'lg'} weight={600}>
            1 Satoshi = 0.00000001 BTC
          </Text> */}
					<div style={{marginLeft:'auto',fontSize:'14px'}}>
					{data && data.endTime?
						<p>
							Ends in {" "}
							<Countdown zeroPadTime={2} autoStart={true} date={data.endTime} renderer={renderer} onComplete={countdownEnds} />
						</p>
						:null
					}
					</div>
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
