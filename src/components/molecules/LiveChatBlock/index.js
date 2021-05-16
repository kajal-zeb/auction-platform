import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Text from '../../atoms/Text/Text';
import { Avatar } from '../../atoms/index';
import classes from './LiveChatBlock.module.scss';

const LiveChat = (props) => {
  const comments = [
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Karan Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
  ];

  return (
    <>
      <hr />
      <div className={`${classes.comments}`}>
        {comments.map((comment, index) => {
          return (
            <Row
              key={index}
              gutter={8}
              className={`mb20 pad-all-10 flex ${
                index === 4 ? classes.selected : undefined
              }`}
            >
              <Col className='gutter-row' span={3}>
                <Avatar initial={comment.name[0].toUpperCase()} />
              </Col>
              <Col className='gutter-row' span={15}>
                <Text size={'md'} noMargin>
                  {comment.name}
                </Text>
                <Text
                  size={'md'}
                  noMargin
                  theme={index !== 4 ? 'gray' : undefined}
                >
                  {comment.comment}
                </Text>
              </Col>
              <Col className='gutter-row' span={6}>
                <Text
                  size={'sm'}
                  noMargin
                  theme={index !== 4 ? 'gray' : undefined}
                >
                  {comment.time}
                </Text>
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
};
export default LiveChat;
