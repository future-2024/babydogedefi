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
import Chart from '../../pages/Chart';

const Home = (props) => {
    
    const [openModal, setOpenModal] = useState(false);    
    const [openCheck, setOpenChecked] = useState('close');    
    const [login, setLogin] = useState(false);    
    const [bnbPrice, setBNBPrice] = useState(0);    
    const [babydogePrice, setBabydogePrice] = useState(0);    
    
    const openChecked = (status) => {
        setOpenChecked(status);
    }
    
    const OpenModal = () => {
        if(openModal === false)
            setOpenModal(true)
        else
            setOpenModal(false);
    }
    useEffect(() => {
        const formData = {
            'currency':"USD",
            'code':"BABYDOGE",
            'meta':true
        }
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
                url: "https://api.livecoinwatch.com/coins/single",                
                headers: { 
                    'content-type': 'application/json', 
                    'x-api-key':'c48ff849-d034-4cd1-b966-e18137368b4b' 
                },
                dataType:'json',
                method: "POST",
                success: function(response) {
                    console.log(response.rate);
                    setBabydogePrice(response.rate);
                },              
                data: JSON.stringify(formData)
            });
          }, 100);
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
                        <div className='card-main' style={{padding: '70px 30px'}}>
                            <div><h1 className='font-OpenSansBold card-main-title'>Farms & Staking</h1></div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <div><img src={logo_short}  className='w-24-2'/></div>
                                    <div>
                                        <p className='title-color'>Staked BabyDoge:</p>
                                        <p className='mb-0 text-grey-stake-balance'>Staked: <span className='text-pink'>{localStorage.getItem('stakeAmount')}</span></p>
                                    </div>
                                    <div>
                                        <p className='title-color'>BabyDoge to Stake in million (10^6):</p>
                                        <p className='under-text mb-0'>Locked</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="w-100 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4 mt-5" onClick={() => OpenModal()}>
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
                            <div className="d-flex justify-content-center" style={{height:'80%', flexWrap: 'wrap'}}>
                                <div className='mx-1' style={{width: '230px'}}>
                                    <p className='mb-0 mt-2 text-grey-stake-balance font-OpenSansBold'>
                                        BabyDoge: $ 
                                        <span className='text-pink'>
                                            {Number(babydogePrice).toFixed(11)}
                                        </span>
                                    </p>
                                    <Chart coinType='baby-doge-coin' coinName='BabyDoge'/>
                                </div>
                                <div className='mx-1' style={{width: '230px'}}>
                                    <p className='mb-0 mt-2 text-grey-stake-balance font-OpenSansBold'>
                                        BNB: $ 
                                        <span className='text-pink'>
                                            {Number(bnbPrice).toFixed(10)}
                                        </span>
                                    </p>
                                    <Chart coinType='binancecoin' coinName='Binance' />
                                </div>
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
