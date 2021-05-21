import React, { useEffect, useState } from 'react';
import Logo from '../../atoms/Logo/Logo';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Winner.module.scss';

const Winner = () => {

    const [winner, setWinner] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('currentBid') || '{}')?.highestBidderId) {
            if (JSON.parse(localStorage.getItem('currentBid') || '{}')?.highestBidderId === JSON.parse(localStorage.getItem('USER') || '{}')?.id) {
                setWinner(true);
            }
        }
    }, [JSON.parse(localStorage.getItem('currentBid') || '{}')])

  return (
    <div className={`${classes.winner}`}>
      <Logo width={150} height={'auto'} />
      <div className={`${classes.h1}`}>
        {winner && <h1>CONGRATULATIONS!</h1>}
      </div>
      <Sprite id={'trophy'} height={200} width={200} />
      <Sprite id={winner ? "winner-ribbon" : "loser-ribbon"} height={47} width={146} />
      <div className={`${classes.details}`}>
        <h2>
          {JSON.parse(localStorage.getItem('currentBid'))?.currentHighestBid}
          <br />
          Satoshi
        </h2>
        <h3>
        ~  {JSON.parse(localStorage.getItem('currentBid'))?.currentHighestBid * 0.00041364} USD
        </h3>
      </div>
      <div className={`${classes.winnerName}`}>
          {!winner && <h2>{JSON.parse(localStorage.getItem('currentBid'))?.highestBidderName}</h2>}
      </div>
      <div className={`${classes.end}`}>
          <h2>Auction ended.</h2>
      </div>
    </div>
  );
};

export default Winner;
