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
  const [ showBidBlock,setShowBidBlock ] = useState(false);

  const onSelectionChange = (value) => {
    setShowBidBlock(value)
    console.log(showBidBlock);
  };
  return (
    <>
      {!isLoggedIn ? (
        <Layout style={{ height: '100vh' }} id='auction'>
          <Header />
          <Content style={{height: 'calc(100% - 209px)'}}>
            <Art />
            {false ? <Bid /> : 
            <div className={classes.liveChatWrapper}>
              <LiveChat />
            </div>
            
            }
             <Bid 
                style={{'z-index': '10'}}
                className={`${
                  showBidBlock ? 'show' : ''
                } transition-hide`}
              /> 
            </Content>
          <Footer className={`${classes.footerStyle} ${classes.footerPosition}`} >
            <Foot openBidBlock={onSelectionChange}/>
          </Footer>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};
export default ParentWrapper;
