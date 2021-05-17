import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Text from '../../atoms/Text/Text';
import { Avatar } from '../../atoms/index';
import classes from './LiveChatBlock.module.scss';

const LiveChat = (props) => {
  const comments = [
    {
      name: 'Abdul Kalam Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Rahul Parsnani',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Sharma Kartik',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Kajal Dalai',
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
      name: 'Rahil Shaikh',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
    {
      name: 'Chinmay Gargawa',
      comment: `Kitna inaam rakhi hai sarkar hum par?
            Sardar pure 4789597 Satoshi`,
      time: '1m ago',
    },
  ];

  return (
      <div className={`${classes.comments}`}>
        {comments.map((comment, index) => {
          return (
            <Row
              key={index}
              gutter={11}
              className={`${classes.chatItem} ${
                index === 4 ? classes.selected : undefined
              }`}
            >
              <Col className='gutter-row' flex={'52px'} >
                <Avatar name={comment.name} width={40} height={40}/>
              </Col>
              <Col className='gutter-row' flex={'auto'}>
                <Text size={'md'} noMargin weight={600}>
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
              <Col className='gutter-row' flex={'68px'}>
                <Text
                  size={'sm'}
                  noMargin
                  align={'right'}
                  theme={index !== 4 ? 'gray' : undefined}
                >
                  {comment.time}
                </Text>
              </Col>
            </Row>
          );
        })}
      </div>
  );
};
export default LiveChat;
