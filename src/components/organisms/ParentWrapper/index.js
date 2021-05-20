import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { Switch, useHistory, withRouter } from 'react-router-dom';
import ENV_CONFIG from '../../../config';
import Logo from '../../atoms/Logo/Logo';
import Text from '../../atoms/Text/Text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../Login';
toast.configure();

const { Content } = Layout;
const { Footer } = Layout;
const VIEW_CONFIG = {
  hold: 'hold',
  enterCode: 'enterCode',
  bid: 'bid',
};
const ParentWrapper = (props) => {
  const [errorMsg, showErrorMsg] = useState(false);
  const [viewConfig, setViewConfig] = useState(VIEW_CONFIG.hold);
  const [showBidBlock, setShowBidBlock] = useState(false);
  const onSelectionChange = (value) => {
    setShowBidBlock(value);
    console.log(showBidBlock);
  };
  useEffect(() => {
    if (!localStorage.getItem('attendeeId')) {
      // let userexternalid = window.location.href //will update once patched to Aventri
      let userexternalid = new URLSearchParams(window.location.search).get(
        'userexternalid'
      );
      console.log('ID > ', userexternalid);
      localStorage.setItem('attendeeId', userexternalid);
    }
    let userData = JSON.parse(localStorage.getItem('USER'));
    if (
      userData &&
      Object.keys(userData).length &&
      userData.id &&
      userData.passphrase
    ) {
      axios
        .post(`${ENV_CONFIG.BASE_URL}${API_ENDPOINTS.VERIFY_USER}`, {
          userId: userData.id,
          passphrase: userData.passphrase,
        })
        .then(({ data }) => {
          if (data && data.data) {
            setViewConfig(VIEW_CONFIG.bid);
            localStorage.setItem('USER', JSON.stringify(data.data));
          }
        });
    } else {
      axios
        .get(
          `${ENV_CONFIG.BASE_URL}${
            API_ENDPOINTS.INITIALIZE_USER
          }?userexternalid=${localStorage.getItem('attendeeId')}`
        )
        .then(({ data }) => {
          if (data && data.data && Object.keys(data.data).length) {
            console.log('Data > ', data);
            localStorage.setItem('USER', JSON.stringify(data.data));
            if (data.data.isActive) {
              console.log('Active');
              setViewConfig(VIEW_CONFIG.bid);
            } else {
              console.log('Redirect');
              setViewConfig(VIEW_CONFIG.enterCode);
            }
            // showErrorMsg(false);
          }
          // showErrorMsg(false);
        })
        .catch((e) => {
          console.log('ERR > ', e);
          notify('Uh Oh! Something went wrong.');
          showErrorMsg(true);
        });
    }
  }, []);

  const notify = (message) => toast.warning(message);
  const getHoldView = (message) => (
    <div
      style={{
        height: '100vh',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Logo width={150} height={'auto'} />
      <Text noMargin size={'md'} spacing={'md'} primaryColor>
        {message}
      </Text>
    </div>
  );
  console.log('VIEW > ', viewConfig);
  switch (viewConfig) {
    case VIEW_CONFIG.hold:
      return getHoldView(
        !errorMsg
          ? 'Hold tight while we set up the platform...'
          : 'Something went wrong. Try refreshing!'
      );
    case VIEW_CONFIG.enterCode:
      return <Login onFinish={() => setViewConfig(VIEW_CONFIG.bid)} />;
    case VIEW_CONFIG.bid:
      return (
        <Layout style={{ height: '100vh' }} id='auction'>
          <Header />
          <Content style={{ height: 'calc(100% - 209px)' }}>
            <Art />
            <div className={classes.liveChatWrapper}>
              <LiveChat />
              <div className={`${showBidBlock ? 'show' : ''} transition-hide`}>
                <Bid onClose={() => onSelectionChange(false)} />
              </div>
            </div>
          </Content>
          <Footer
            className={`${classes.footerStyle} ${classes.footerPosition}`}
            onClick={() => onSelectionChange(!showBidBlock)}
          >
            {/* <Foot openBidBlock={()=>onSelectionChange(!showBidBlock)}/> */}
            PLACE BID
          </Footer>
        </Layout>
      );
    default:
      return getHoldView;
  }
  return (
    <>
      <p>BitcoinPizza party failed to load!</p>
    </>
  );
};
export default ParentWrapper;
