import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sprite from '../Sprite/Sprite';
import Text from '../Text/Text';
import classes from './Header.module.scss';
import parentClasses from '../../organisms/ParentWrapper/ParentWrapper.module.scss';
import Avatar from '../Avatar/index';

const Header = (props) => {
  return (
    <>
      <div className={`pad-all-10 pad-bottom-0`}>
        <div className={`flex ${classes.headerStyle}`}>
          <Sprite id='bitcoin' width={40} height={40} />
          <Text noMargin size={'lg'} weight={600}>
            1 Satoshi = 0.00000001 BTC
          </Text>
        </div>
        <div className={`text-align-center`}>
          <Text noMargin size={'md'} spacing={'md'}>
            Current Bid
          </Text>
        </div>
      </div>
      <div className={`${parentClasses.footerStyle} ${classes.subHeaderStyle}`}>
        <Text noMargin size={'lg'} spacing={'lg'} weight={600}>
          49,59,890 S
        </Text>
        <div className={`flex`}>
          <Avatar initial={'J'}/>
          <Text noMargin size={'md'} spacing={'md'} weight={600}><span style={{ color: 'var(--white)' }}>Jatin Kukreja</span></Text>
        </div>
      </div>
    </>
  );
};
export default Header;
