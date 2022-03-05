import React, { useState, useEffect, useHistory } from 'react';
import { FaAlignJustify, FaHome, FaTractor, FaBabyCarriage, FaSteam, FaOutdent,
         FaShareSquare, FaTwitter, FaArrowRight, FaClosedCaptioning, FaTimes, FaQuestion, FaQuestionCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import './index.css';
import TradeViewChart from 'react-crypto-chart';

import panBg from '../../img/quotation/pan-bg.svg';
import panBg1 from '../../img/quotation/pan-bg2.svg';
import upImage from '../../img/lbd.png';
import logo_short from '../../img/quotation/24_24.svg';
import CountUp from 'react-countup';

import MyModal from '../../components/Modal';
import $ from 'jquery';

const Home = (props) => {
    
    const [openModal, setOpenModal] = useState(false);    
    const [openCheck, setOpenChecked] = useState('close');    
    const [login, setLogin] = useState(false);    
    const [bnbPrice, setBNBPrice] = useState(0);    
    const [xrpPrice, setXRPPrice] = useState(0);    
    
    const openChecked = (status) => {
        setOpenChecked(status);
    }
    
    const OpenModal = () => {
        if(openModal === false)
            setOpenModal(true)
        else
            setOpenModal(false);
    }
    const customStyle = {  
        maxWidth: '100%',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',      
        height: '66%',          
    }
    useEffect(() => {
        window.setTimeout(function() {
            $.ajax({
              url: "https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT",
              dataType: "json",
              method: "GET",
              success: function(response) {
                console.log(response);
                setBNBPrice(response.price);
              }
            });
            $.ajax({
              url: "https://api.binance.com/api/v3/avgPrice?symbol=DOGEUSDT",
              dataType: "json",
              method: "GET",
              success: function(response) {
                console.log(response);
                setXRPPrice(response.price);
              }
            });
          }, 400);
    }, []);
    return (
        <>
            <Navbar openChecked={openChecked} isLogin={setLogin}/>
            
            <div className={`${openCheck !== 'close' ? 'p-main-close':'p-main'}`}>
                <div className='d-flex upSide'>
                    <div><img src={panBg1} className="lbd-img"/></div>
                    <div className='text-center d-flex justify-content-between flex-column'>
                        <img src={upImage} className="main-image-title"/>
                        <p className='text-sm font-OpenSansSemiBold mb-0 under-text'>The #1 AMM and yield farm on Binance Smart Chain.</p>
                    </div>
                    <div><img src={panBg} className="lbd-img2"/></div>
                </div>
                <div className='d-flex medium-section justify-content-center flex-wrap'>
                    <div className='second-card1'>
                        <div className='card-main'>
                            <div><h1 className='font-OpenSansBold card-main-title'>Farms & Staking</h1></div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <div><img src={logo_short}  className='w-24-2'/></div>
                                    <div>
                                        <p className='title-color'>LBD to Harvest in million (10^6):</p>
                                        <p className='under-text mb-0'>Locked</p>
                                        <p className='mb-0 text-grey-stake-balance'>Staked balance : <span className='text-pink'>{localStorage.getItem('balance')}</span></p>
                                    </div>
                                    <div>
                                        <p className='title-color'>LBD to Harvest in million (10^6):</p>
                                        <p className='under-text mb-0'>Locked</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="w-100 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4 mt-2" onClick={() => OpenModal()}>
                                Unlock Wallet
                            </div>
                        </div>
                    </div>
                    <div className='second-card2'>
                        <div className='card-main' style={{height: '100%'}}>
                            <h4 className='font-OpenSansBold mb-0'>Earn up to</h4>
                            <h2 className='font-OpenSansBold mb-0 farm-num'><CountUp className='font-OpenSansBold' start={0} end={826} duration={1} />.21% APR</h2>
                            <h4 className='font-OpenSansBold mb-0'>in Farms</h4>
                            <div><FaArrowRight className='main-color right-icon'/></div>
                            <div className="d-flex" style={{height:'80%', flexWrap: 'wrap'}}>
                                <div className='mx-1' style={{width: '45%'}}>
                                    <p className='mb-0 mt-2 text-grey-stake-balance font-OpenSansBold'>
                                        DOGE Price :  $ 
                                        <span className='text-pink'>
                                            {xrpPrice}
                                        </span>
                                    </p>
                                    <TradeViewChart pair="DOGEUSDT" containerStyle={customStyle} interval='1m' />
                                </div>
                                <div className='mx-1' style={{width: '45%'}}>
                                    <p className='mb-0 mt-2 text-grey-stake-balance font-OpenSansBold'>
                                        BNB Price :  $ 
                                        <span className='text-pink'>
                                            {bnbPrice}
                                        </span>
                                    </p>
                                    <TradeViewChart pair="BNBBUSD" containerStyle={customStyle} interval='1m' /></div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className='d-flex mt-5 justify-content-center flex-wrap'>
                    <div className='third-card1'>
                        <div className='card-main color-blackpink fs-12 d-flex flex-column justify-content-end'>
                            <h2 className='font-OpenSansBold mb-0 LBD-status'>LBD Status</h2>
                            <div className='d-flex justify-content-between pt-3'>
                                <p className='font-OpenSansBold mb-0'>Total LBD Supply</p>
                                <p className='mb-0'><CountUp className='font-OpenSansBold' start={0} end={851154292422656} duration={2} /></p>
                            </div>     
                            <div className='d-flex justify-content-between pt-1'>
                                <p className='font-OpenSansBold mb-0'>Total LBD Burned</p>
                                <p className='mb-0'><CountUp className='font-OpenSansBold' start={0} end={148845707577344} duration={2} /></p>
                            </div>   
                            <div className='d-flex justify-content-between pt-1'>
                                <p className='font-OpenSansBold mb-0'>Distributed LBD/block</p>
                                <p className='mb-0'><CountUp className='font-OpenSansBold' start={0} end={64300411} duration={2} /></p>
                            </div>                          
                        </div>                        
                    </div>
                    <div className='third-card2'>
                        <div className='card-main d-flex flex-column justify-content-end h-100'>
                            <h4 className='font-OpenSansBold mb-0 Total-value pb-3'>Total Value Locked (TVL)</h4>
                            <h2 className='font-OpenSansBold mb-0 LBD-status pb-1'>$<CountUp className='font-OpenSansBold' start={0} end={295190} duration={2} /></h2>
                            <h4 className='font-OpenSansBold mb-0 title-color pb-4 pt-0'>Across all farms and pools</h4>
                        </div>                        
                    </div>
                </div>
            </div>
            <MyModal isOpen={openModal}/>            
        </>
    )
}

export default Home;
