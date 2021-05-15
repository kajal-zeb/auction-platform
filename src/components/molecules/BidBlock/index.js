import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scroll-menu';
import Text from '../../atoms/Text/Text';
import classes from './BidBlock.module.scss';
import { Typography } from 'antd';
import Sprite from '../../atoms/Sprite/Sprite';

const Bid = (props) => {
  const bidOptions = [200, 400, 600];
  const { Title } = Typography;

  // list of items
  const list = [
    {
      key: `"Kitna inaam rakhi hai sarkar hum par? Sardar pure _____ Satoshi”`,
    },
    { key: `"_____ Satoshi Bitcoin ki keemat tume kya  jaano Ramesh babu!”` },
    { key: `Mujhe nai khelna ye. Mai apna BAT le ke jaara hun` },
  ];

  // One item component
  // selected prop will be passed
  const MenuItem = ({ text, selected }) => {
    return (
      <div
        className={`${classes.listItem} ${selected ? `${classes.active}` : ''}`}
      >
        {text}
      </div>
    );
  };

  // All items component
  // Important! add unique key
  const Menu = (list, selected) =>
    list.map((el) => {
      const { key } = el;

      return <MenuItem text={key} key={key} selected={selected} />;
    });

  const selected = list[0]['key'];

  const menu = Menu(list, selected);

  return (
    <>
      <hr />
      <div style={{ margin: '0px 0px 10px' }}>
        <ScrollMenu data={menu} selected={selected} />
      </div>
      <div>
        <Text noMargin spacing={'md'} size={'md'} align={'center'}>
          Your Bid
        </Text>
        <Text align={'center'} noMargin>
          <Title level={1}>
            <span
              style={{
                padding: '10px',
                background: 'var(--bg-color-2)',
              }}
            >
              49,59,890 S&nbsp;
              <Sprite
                id='refresh'
                width={22}
                height={16}
                style={{
                  position: 'relative',
                  top: '2px',
                }}
              />
            </span>
          </Title>
        </Text>
        <Text align={'center'} noMargin size={'sm'} spacing={'sm'}>
          ~₹500
        </Text>
      </div>
      <div className={'pad-all-10 flex'}>
        {bidOptions.map((option, index) => {
          return (
            <span
              style={{
                background: 'var(--primary-dark)',
                padding: '6px 15px',
                borderRadius: '20px',
                flexGrow: '0',
                flexBasis: '33.33333333%',
                textAlign: 'center',
                margin: '0px 10px',
              }}
              key={index}
            >
              <Title level={1}>+{option}</Title>
            </span>
          );
        })}
      </div>
      <hr style={{ width: '30%' }} />
      <div className={`text-align-center`}>
        <Text weight={600} noMargin size={'md'} spacing={'md'}>
          Your message
        </Text>
        <Text size={'md'} spacing={'md'} noMargin id='message'>
          "Kitna inaam rakhi hai sarkar hum par? Sardar pure{' '}
          <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>49,59,890</span>{' '}
          Satoshi”
        </Text>
      </div>
    </>
  );
};
export default Bid;
