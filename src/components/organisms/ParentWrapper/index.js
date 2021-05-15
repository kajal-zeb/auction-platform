import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
const { Content } = Layout;
const { Footer } = Layout;

const ParentWrapper = (props) => {
  return (
    <Layout style={{ height: '100%' }} id='auction'>
      <Header />
      <Content>
        <Art />
        <Bid />
      </Content>
      <Footer
        className={`${classes.footerStyle} ${classes.footerPosition}`}
      >
        <Foot />
      </Footer>
    </Layout>
  );
};
export default ParentWrapper;
