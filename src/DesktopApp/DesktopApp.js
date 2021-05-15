import React from 'react';
import Sprite from '../components/atoms/Sprite/Sprite';
import classes from './DesktopApp.module.scss';
import { Typography } from 'antd';

const DesktopApp = () => {
  const { Title } = Typography;

  return (
    <div className={`${classes.desktopStyles}`}>
      <Sprite id='bitcoin' width={70} height={70} />
      <Title level={1}>Use your phone to participate in the auction!</Title>
    </div>
  );
};

export default DesktopApp;
