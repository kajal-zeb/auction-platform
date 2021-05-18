import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import Login from '../Login/Login';
const { Content } = Layout;
const { Footer } = Layout;

const ParentWrapper = (props) => {
  const isLoggedIn = false;

  return (
    <>
      {!isLoggedIn ? (
        <Layout style={{ height: '100vh' }} id='auction'>
          <Header />
          <Content style={{ height: 'calc(100% - 209px)' }}>
            <Art />
            {true ? (
              <div className={classes.bidBlockWrapper}>
                <Bid />
              </div>
            ) : (
              <div className={classes.liveChatWrapper}>
                <LiveChat />
              </div>
            )}
          </Content>
          <Footer
            className={`${classes.footerStyle} ${classes.footerPosition}`}
          >
            <Foot />
          </Footer>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};
export default ParentWrapper;
