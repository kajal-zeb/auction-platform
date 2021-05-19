import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { Header, Foot } from '../../atoms';
import { Art, Bid, LiveChat } from '../../molecules';
import classes from './ParentWrapper.module.scss';
import Login from '../Login';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { useHistory } from 'react-router-dom';
import { ENV_CONFIG } from '../../../config';
import Logo from '../../atoms/Logo/Logo';
import Text from '../../atoms/Text/Text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const { Content } = Layout;
const { Footer } = Layout;

const ParentWrapper = (props) => {
  const history = useHistory();
  const [errorMsg, showErrorMsg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBidBlock, setShowBidBlock] = useState(false);
  const onSelectionChange = (value) => {
    setShowBidBlock(value);
    console.log(showBidBlock);
  };
  useEffect(() => {
    if (!localStorage.getItem('attendeeId')) {
      // let userexternalid = window.location.href //will update once patched to Aventri
      let userexternalid = '119287966';
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
          passsphrase: userData.passphrase,
        })
        .then(({ data }) => {
          if (data && data.data) {
            setIsLoggedIn(true);
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
            if (data.data.isActive) {
              setIsLoggedIn(true);
            } else history.push('/login');
            localStorage.setItem('USER', JSON.stringify(data.data));
            showErrorMsg(false);
          }
          showErrorMsg(false);
        })
        .catch((e) => {
          notify('Uh Oh! Something went wrong.');
          showErrorMsg(true);
        });
    }
  }, []);

  const notify = (message) => toast.warning(message);

  return (
    <>
      {!isLoggedIn ? (
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
            {!errorMsg
              ? 'Hold tight while we setup the platform....'
              : 'Something went wrong. Try refreshing!'}
          </Text>
        </div>
      ) : (
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
      )}
    </>
  );
};
export default ParentWrapper;
