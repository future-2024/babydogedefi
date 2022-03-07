import React, { useState, useEffect, useHistory } from 'react';
import { FaAlignJustify, FaHome, FaTractor, FaBabyCarriage, FaSteam, FaOutdent,
         FaShareSquare, FaTwitter, FaArrowRight, FaStoreAlt, FaCalculator, FaArrowDown, FaArrowUp} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import './index.css';

import firstIcon from '../../img/quotation/lbd-bnb.svg';
import secondIcon from '../../img/quotation/lbd-busd.svg';
import thirdIcon from '../../img/quotation/bnb-busd.svg';

import Switch from "react-switch";


const dropdownList = [
    {"id":1, "content":"APR"},
    {"id":2, "content":"Multiplier"},
    {"id":3, "content":"Earned"},
    {"id":4, "content":"Liquidity"},
    {"id":5, "content":"Hot"},
]

const Farm = (props) => {

    const [checked, setChecked] = useState('false');
    const [cChecked, setCchecked] = useState('false');
    const [openCheck, setOpenChecked] = useState('close');
    
    const [detail, setDetail] = useState('false');
    const [dropdown, setDropdown] = useState('false');
    const [login, setLogin] = useState(false);


    const showDetail = () => {
        if(detail === 'false') {
            setDetail('true')
        } else {
            setDetail('false')
        }
    }    

    const handleChange = (checked) => {
        setChecked(checked)
    }

    const openChecked = (status) => {
        setOpenChecked(status);
    }   

    const dropOpen = () => {
        if(dropdown === 'false') {
            setDropdown('true')
        } else {
            setDropdown('false')
        }
    }

    return (
        <>
            <Navbar openChecked={openChecked} isLogin={setLogin}/>
            <div className={`${openCheck !== 'close' ? 'p-main-close':'p-main'} cover-img`}>
                <div className='color-blackpink'>
                    <div><h1 className='text-white fa-title'>Farms</h1></div>
                    <div><h4 className='fs-25 font-OpenSansBold mb-0'>Stake Liquidity Pool (LP) tokens to earn.</h4></div>
                    <div><p className='font-OpenSansSemiBold'>0% deposit fee, 4% withdraw fee - no transfer fee on earned rewards</p></div>
                </div>

                <div className='fa-main'>
                    <div className='d-flex justify-content-between flex-wrap px-1 sm:px-5'>
                        <div className='d-flex pt-3'>
                            <Switch onChange={handleChange} 
                                checked={checked} 
                                uncheckedIcon={false} 
                                onColor='#3db99ca1'
                                checkedIcon={false} height={19} width={38}
                                className='align-self-center'
                            />
                            <span className='align-self-center pl-4 color-blackpink font-OpenSansBold'>Staked only</span>
                            <div className='ml-5 pl-5 align-self-center'>
                                {cChecked === 'false' ? (
                                    <div className='d-flex justify-content-between c-switch'>
                                        <div className='c-unchecked' onClick={() => setCchecked('true')}>Live</div>
                                        <div className='c-checked' onClick={() => setCchecked('false')}>Finished</div>
                                    </div>
                                ) :
                                (
                                    <div className='d-flex justify-content-between c-switch'>
                                        <div className='c-checked' onClick={() => setCchecked('true')}>Live</div>
                                        <div className='c-unchecked' onClick={() => setCchecked('false')}>Finished</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className='d-flex pt-3'>
                            <div>
                                <span><p className='py-0 mb-0 fs-12 font-OpenSansSemiBold color-blackpink'>SORT BY</p></span>
                                <div className='c-input color-blackpink font-OpenSansSemiBold cursor-pointer' onClick={dropOpen} style={{position:'relative', right:'0px'}}>
                                    <div className='d-flex justify-content-between'>
                                        <div>Hot</div>
                                        { dropdown === 'false' && (
                                            <FaArrowDown className='align-self-center'/>
                                        )}
                                        { dropdown === 'true' && (
                                            <FaArrowUp className='align-self-center'/>
                                        )}
                                    </div>
                                    {dropdown === 'true' && (
                                        <div className='c-input-content'>
                                            <hr className=' hr-grey mt-2 mb-0'/>
                                            <div>
                                                <ul className='pl-0'>
                                                    <li className='w-75 py-1 px-3'>Hot</li>
                                                    <li className='w-75 py-1 px-3'>APR</li>
                                                    <li className='w-75 py-1 px-3'>Multiplier</li>
                                                    <li className='w-75 py-1 px-3'>Earned</li>
                                                    <li className='w-75 py-1 px-3'>Liquidity</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='ml-3'>
                                <span><p className='py-0 mb-0 fs-12 font-OpenSansSemiBold color-blackpink'>Search</p></span>
                                <input type='text' className='c-input' placeholder='Search farms'/>
                            </div>
                        </div>
                    </div>

                    {cChecked === 'false' && (
                    <div className='d-flex justify-content-center flex-wrap' style={{flexFlow: 'row wrap'}}>                        
                        <div className='farm-card temp-box-shadow'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={firstIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>691.82%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={secondIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>812.62%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={thirdIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>342.92%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={firstIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>691.82%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={firstIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>691.82%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={firstIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>691.82%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


                        <div className='farm-card'>
                            <div className='d-flex justify-content-between'>
                                <div><img src={firstIcon}  className='w-65'/></div>
                                <div className='text-right'>
                                    <h6 className='color-blackpink font-OpenSansBold'>LBD-BNB</h6>
                                    <div className='d-flex farm-title-color'>
                                        <div className='fa-out-btn'><span><FaStoreAlt className='mt-1 mx-2'/></span> Core</div>
                                        <div className='fa-btn ml-3'>40X</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='color-blackpink pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>APR:</div>
                                    <div className='d-flex'>
                                        <FaCalculator className=' mt-1'></FaCalculator>
                                        <span className='pl-2 font-OpenSansBold'>691.82%</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='font-OpenSansSemiBold'>Earn:</div>
                                    <div className='d-flex'>
                                        <span className='pl-2 font-OpenSansBold'>LBD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between pt-3'>
                                <div className='align-self-center'>
                                    <div>
                                        <div className='title-color fs-11 pt-1'>LBD to Harvest in million (10^6):</div>
                                        <div className='text-grey'>0</div>
                                        <div className='color-blackpink font-OpenSansBold'>0$</div>
                                        <div className='title-color fs-11 pt-1'>LBD-BNB LP STAKED</div>
                                    </div>
                                </div>
                                <div className='align-self-center'>
                                    <div className='fa-btn-disable'>Harvest</div>
                                </div>
                            </div>

                            <div className="w-100 mt-3 align-self-center btn btn-primary rounded-button-long main-bg-color font-OpenSansBold mr-4">
                                Unlock Wallet
                            </div>

                            <hr className='hr-grey'/>

                            <div className='text-center py-2'>
                                <div className='title-color pt-1 d-flex justify-content-center cursor-pointer' onClick={() => showDetail()}>
                                {detail === 'false' ? 'Details' : 'Hide'} 
                                {detail === 'false' && (
                                    <FaArrowDown className='align-self-center ml-2'/>
                                )}
                                {detail === 'true' && (
                                    <FaArrowUp className='align-self-center ml-2'/>
                                )}
                                </div>
                                {detail === 'true' && (
                                    <>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Stake:</div>
                                            <div className='d-flex'>                                                
                                                <span className='pr-2 font-OpenSansSemiBold'>LBD-BNB LP</span>
                                                <FaCalculator className=' mt-1'></FaCalculator>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between color-blackpink '>
                                            <div className='font-OpenSansSemiBold'>Total Liquidity:</div>
                                            <div className='d-flex'>                                                
                                                <span className='font-OpenSansSemiBold'>$66,097</span>
                                            </div>
                                        </div>
                                        <div className='title-color pt-1 d-flex cursor-pointer'>
                                            View on BscScan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default Farm;
