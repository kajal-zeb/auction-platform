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
          <Content style={{ height: 'calc(100% - 209px)' }}>
            <Art />
            <div className={classes.liveChatWrapper}>
              <LiveChat />
              <div  
                  className={`${
                    showBidBlock ? 'show' : ''
                  } transition-hide`}>

              <Bid  onClose={()=> onSelectionChange(false)}/> 
              </div>
            </div>
            </Content>
          <Footer className={`${classes.footerStyle} ${classes.footerPosition}`} onClick={()=> onSelectionChange(!showBidBlock)}>
            {/* <Foot openBidBlock={()=>onSelectionChange(!showBidBlock)}/> */}
            PLACE BID
          </Footer>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};
export default ParentWrapper;
