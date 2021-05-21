import React, { useEffect, useState } from 'react';
import Logo from '../../atoms/Logo/Logo';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Winner.module.scss';

const Winner = ({data}) => {

    const [winner, setWinner] = useState(false);
  console.log(data);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('currentbid') || '{}')?.highestBidderId) {
            if (JSON.parse(localStorage.getItem('currentbid') || '{}')?.highestBidderId === JSON.parse(localStorage.getItem('USER') || '{}')?.id) {
                setWinner(true);
            }
        }
    }, [JSON.parse(localStorage.getItem('currentbid') || '{}')])

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
          {data?.bidAmount} {" "} Satoshi
        </h2>
        <h3>
        ~  {data?.usdAmount} USD
        </h3>
      </div>
      <div className={`${classes.winnerName}`}>
          {!winner && <h2>{data?.name}</h2>}
      </div>
      <div className={`${classes.end}`}>
          <h2>Auction ended.</h2>
      </div>
    </div>
  );
};

export default Winner;
