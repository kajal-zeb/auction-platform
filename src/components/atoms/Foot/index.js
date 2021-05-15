import React, { useEffect, useState } from 'react';
import classes from './Foot.module.scss';
import { Typography } from 'antd';
import Sprite from '../Sprite/Sprite';
import Text from '../Text/Text';

const Foot = (props) => {
  const { Title } = Typography;

  return (
    <Title level={1}>
      {true ? (
        'PLACE BID'
      ) : (
        <>
          <Sprite id='place-bid' width={31} height={30} />
          <span
            style={{
              color: 'var(--white)',
              position: 'absolute',
              right: '10px',
              top: '20px',
            }}
          >
            <Text noMargin size={'md'} spacing={'md'} weight={600}>
              Bid 1/10
            </Text>
          </span>
        </>
      )}
    </Title>
  );
};
export default Foot;
