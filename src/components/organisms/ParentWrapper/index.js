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
import Reference from '../Reference';
import Trophy from '../../atoms/Trophy/Trophy';
toast.configure();

const { Content } = Layout;
const { Footer } = Layout;
const VIEW_CONFIG = {
  hold: 'hold',
  enterCode: 'enterCode',
  bid: 'bid',
  wait: 'wait',
  reference: 'reference',
  winner: 'winner',
};
const EVENT_START_TIME = JSON.parse(localStorage.getItem('USER'))
  ? JSON.parse(localStorage.getItem('USER'))?.eventStartTime
  : '';
const EVENT_END_TIME = JSON.parse(localStorage.getItem('USER'))
  ? JSON.parse(localStorage.getItem('USER'))?.eventEndTime
  : '';
// const EVENT_START_TIME = "2021-05-20T08:41:10.590Z"
const ParentWrapper = (props) => {
  const [errorMsg, showErrorMsg] = useState(false);
  const [viewConfig, setViewConfig] = useState(VIEW_CONFIG.hold);
  const [showBidBlock, setShowBidBlock] = useState(false);
  const [initializeUser, setInitializeUser] = useState(false);
  const [winnerMessage, showWinnerMessage] = useState(false);
  const onSelectionChange = (value) => {
    setShowBidBlock(value);
  };
  useEffect(() => {
    const attendeeId = localStorage.getItem('attendeeId')
    if (attendeeId == 'undefined' || attendeeId == 'null' || !attendeeId) {
      // let userexternalid = window.location.href //will update once patched to Aventri
      let userexternalid = new URLSearchParams(window.location.search).get(
        'userexternalid'
      );
      if (userexternalid) {
        let id = userexternalid.split('_')[1];
        localStorage.setItem('attendeeId', id);
        setInitializeUser(true);
      } else {
        setViewConfig(VIEW_CONFIG.reference);
      }
    } else {
        setInitializeUser(true);
    }
  }, []);
  useEffect(() => {
    if (initializeUser) {
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
              localStorage.setItem('USER', JSON.stringify(data.data));
              const interval = setInterval(() => {
                if (
                  getDateFormat(new Date(), true) <
                  getDateFormat(EVENT_START_TIME, true)
                ) {
                  console.log("3")
                    setViewConfig(VIEW_CONFIG.wait);
                }
                else if(
                  getDateFormat(new Date(), true) >
                  getDateFormat(EVENT_END_TIME, true)

                ) {
                  console.log("4")
                  if (
                    JSON.parse(localStorage.getItem('currentbid')?.highestBidderId || '{}') ===
                    JSON.parse(localStorage.getItem('USER')?.id || '{}')
                  ) {
                    showWinnerMessage(true);
                  }
                  setViewConfig(VIEW_CONFIG.winner);
                }
                  else {
                      setViewConfig(VIEW_CONFIG.bid);
                  }
              }, 1000);
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
              localStorage.setItem('Initialise', JSON.stringify(data.data));
                setViewConfig(VIEW_CONFIG.enterCode);
              }
              // showErrorMsg(false);
            })

            // showErrorMsg(false);

          .catch((e) => {
            console.log('ERR > ', e);
            notify('Uh Oh! Something went wrong.');
            showErrorMsg(true);
          });

      }
    }
  }, [initializeUser]);

  useEffect(() => {
    if (EVENT_START_TIME && EVENT_END_TIME) {
      const interval = setInterval(() => {
        if (
          getDateFormat(new Date(), true) <
          getDateFormat(EVENT_START_TIME, true)
        ) {
            setViewConfig(VIEW_CONFIG.wait);
        }
        else if(
          getDateFormat(new Date(), true) >
          getDateFormat(EVENT_END_TIME, true)

        ) {
          if (
            JSON.parse(localStorage.getItem('currentbid')?.highestBidderId || '{}') ===
            JSON.parse(localStorage.getItem('USER')?.id || '{}')
          ) {
            showWinnerMessage(true);
          }
          setViewConfig(VIEW_CONFIG.winner);
        }
          else {
              setViewConfig(VIEW_CONFIG.bid);
          }
      }, 1000);
    }
  }, [EVENT_START_TIME, EVENT_END_TIME]);

  const getDateFormat = (date, time = false) => {
    const inputDate = new Date(date);
    let month = String(inputDate?.getMonth() + 1);
    let day = String(inputDate?.getDate());
    const year = String(inputDate?.getFullYear());
    let hours = '';
    let minutes = '';
    let seconds = '';

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    if (time) {
      hours = String(inputDate?.getHours());
      minutes = String(inputDate?.getMinutes());
      seconds = String(inputDate?.getSeconds());
      if (hours.length < 2) hours = '0' + hours;
      if (minutes.length < 2) minutes = '0' + minutes;
      if (seconds.length < 2) seconds = '0' + seconds;
    }

    return `${year}/${month}/${day}${
      time ? ` ${hours}:${minutes}:${seconds}` : ``
    }`;
  };

  const notify = (message) => toast.warning(message);
  const getHoldView = (message, trophy = false) => (
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
      <div
        {...(trophy
          ? { style: { position: 'fixed', top: '10px', left: '10px' } }
          : undefined)}
      >
        <Logo width={150} height={'auto'} />
      </div>
      {trophy && winnerMessage && <Trophy width={150} height={'auto'} />}
      <div style={{ marginTop: '20px' }}>
        <Text noMargin size={'md'} spacing={'md'} primaryColor>
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </Text>
      </div>
    </div>
  );
  const handleBid = () => {
      const interval = setInterval(() => {
        if (
          getDateFormat(new Date(), true) <
          getDateFormat(JSON.parse(localStorage.getItem('USER'))?.eventStartTime, true)
        ) {
            setViewConfig(VIEW_CONFIG.wait);
        }
        else if(
          getDateFormat(new Date(), true) >
          getDateFormat(JSON.parse(localStorage.getItem('USER'))?.eventEndTime, true)

        ) {
          if (
            JSON.parse(localStorage.getItem('currentbid')?.highestBidderId || '{}') ===
            JSON.parse(localStorage.getItem('USER')?.id || '{}')
          ) {
            showWinnerMessage(true);
          }
          setViewConfig(VIEW_CONFIG.winner);
        }
          else {
              setViewConfig(VIEW_CONFIG.bid);
          }
      }, 1000)
          /*
    if (
      getDateFormat(new Date(), true) >= getDateFormat(EVENT_START_TIME, true)
    ) {
      setViewConfig(VIEW_CONFIG.bid);
      // clearInterval(interval);
    } else setViewConfig(VIEW_CONFIG.wait);
    */
  };
  const handleReference = () => {
    setViewConfig(VIEW_CONFIG.hold);
    setInitializeUser(true);
  };
  switch (viewConfig) {
    case VIEW_CONFIG.hold:
      return getHoldView(
        !errorMsg
          ? 'Hold tight while we set up the platform...'
          : 'Something went wrong. Try refreshing!'
      );
    case VIEW_CONFIG.enterCode:
      return <Login onFinish={handleBid} />;
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
    case VIEW_CONFIG.wait:
      return getHoldView("You're in! Please Wait for the auction to begin...");
    case VIEW_CONFIG.reference:
      return <Reference onFinish={handleReference} />;
    case VIEW_CONFIG.winner:
      return getHoldView(
        winnerMessage
          ? 'Winner Winner Chicken Dinner!<br/>Congratulations on winning the auction.'
          : 'The auction has ended.',
        true
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
