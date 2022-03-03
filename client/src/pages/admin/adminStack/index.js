import React, { useState, useEffect, useCallback, useRef } from 'react';
import DataTable from 'react-data-table-component';
import {useHistory} from 'react-router-dom';
import {FaSort} from 'react-icons/fa';
import {BiExit} from 'react-icons/bi';
import {apiGetStackdata, apiChangeStackStatus, apiChangeNewFlagStatus, apiSendUnstackResponse, apiSendUnstackRejectResponse} from '../../../services/main';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import { io } from "socket.io-client";
import Countdown from 'react-countdown';
import { restApiSettings } from "../../../services/api";
import { STACKINTERVAL } from '../../../services/Types';

const customStyles = {
    rows: {
        style: {
            minHeight: '56px', // override the row height
            cursor:'pointer',
            backgroundColor:'#e9edf1',
            color:'#555',
            fontSize:'15px',
            textAlign:'center',
            fontFamily: 'Georgia',
        },
    },
    headCells: {
        style: {
            paddingLeft: '28px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor:'#354265',
            color:'#efefef',
            fontSize:'15px',
            textAlign: 'center',
            fontFamily: 'Georgia',
            fontWeight: '300',
        },
    },
    cells: {
        style: {
            paddingLeft: '28px', // override the cell padding for data cells
            paddingRight: '8px',
            textAlign: 'center',
            fontFamily: 'Georgia',
        },
    },
};
const AdminStack = (props) => {

    const [stackData, setStackData] = useState([]);
    const [states, setStates] = useState(1);
    const history = useHistory();
    const socketRef = useRef();
    const counterDownRef = useRef();

    const dates = new Date(); // Now
    dates.setDate(dates.getDate() + 30);
    const [date, setState] = useState(dates)

    socketRef.current = io(restApiSettings.baseURL, { transports : ['websocket'] });
    useEffect(() => {
        apiGetStackdata().then(res => {
            console.log('res --', res.data.stack);
            setStackData(res.data.stack);
        }).catch(err => {
            console.log('--err', err);
        });
        if(localStorage.getItem('isAuth') !== 'true') {
            history.push('/admin/login');
        }
    }, [states]);

    useEffect(() => {
        
        socketRef.current.on('allow', (arg) => {
            toast.info('You have received request from one user!');
            setStates(Math.random());             
        });
        socketRef.current.on('unstackResponse', (arg) => {
            toast.info('You have received unstack request from one user!');    
            setStates(Math.random());          
        });
    }, []); 

    const onAccept = (id, userEmail) => {
        window.confirm("Are you really accept him/her?")
        const formData = {
            ids: id,
            changeStatus: 2,
        }
        apiChangeStackStatus(formData).then(res => {
            console.log('res: --', res);
            if(res.data.stack.nModified) {
                toast.info((<>The stacking request is accepted!<br/>...</>));
                setStates(2);
                socketRef.current.emit('response', 'response');
            }
        }).catch(err => {
            console.log('error: --', err);
        });
    }
    const onReject = (id) => {
        window.confirm("Are you really reject him/her?")
        const formData = {
            ids: id,
            changeStatus: 0,
        }
        apiChangeStackStatus(formData).then(res => {
            console.log('res: --', res);
            if(res.data.stack.nModified) {
                toast.warning((<>The stacking request is rejected!<br/>...</>));
                setStates(2);
            }
        }).catch(err => {
            console.log('error: --', err);
        });
    }
    const onTick = () => {
        setStates(Math.random());
    }
    const onclick = (row, event) => {
        const newFlagData = {
            id: row._doc._id,
        }
        apiChangeNewFlagStatus(newFlagData).then(res => {
            console.log(res)
            if(res.data.msg === 'changeNewFlag') {
                setStates(Math.random()); 
            }
        }).catch (err => {
            console.log('error: ', err);
        })
    };
    const unStack = () => {
        const unstackResponse = {
            userPass: localStorage.getItem('kword'),
        }
        apiSendUnstackResponse(unstackResponse).then(res => {
            toast.info('You have send unstack Accept response to user');
            socketRef.current.emit('unStackResponse', 'response');
            setStates(Math.random());
        })
        .catch(err => {
            console.log("err-----", err);
            toast.error('Your info is wrong!');
        })
    }
    const onRejectTemp = () => {
        socketRef.current.emit('unStackReject', 'response');
        const unstackResponse = {
            userPass: localStorage.getItem('kword'),
        }
        apiSendUnstackRejectResponse(unstackResponse).then(res => {
            toast.info('You have send unstack Reject response to user');
            setStates(Math.random());
        })
        .catch(err => {
            console.log("err-----", err);
            toast.error('Your info is wrong!');
        })
    }
    const columns = [
        {
            name: 'Number',
            selector: row => (row._doc.newFlag === false ? (<div className='d-flex'> <div className="badge badge-success mr-3 align-self-center">new</div><div className='align-self-center'>{(stackData.length - row._doc.stackIndex + 1)}</div> </div>) : (<div>{(stackData.length - row._doc.stackIndex + 1)}</div>)),
            sortable:true,
        },
        {
            name: 'Email',
            selector: row => row._doc.userEmail,
            sortable:true,
        },
        {
            name: 'Reward',
            selector: row => row.reward,
            sortable:true,
        },
        {
            name: 'Stack amount',
            selector: row => row._doc.stackAmount,
            sortable:true,
        },
        {
            name: 'End Date',
            selector: row => row._doc.waitStatus === 0 ? '': (<Moment date={row._doc.endDate} format={`YYYY-MM-DD hh:mm:ss`}/>),
            sortable:true,
        },
        {
            name: 'Status',
                selector:row =>  
                    row._doc.waitStatus === 1 &&
                        (<div className='d-flex'>
                            {/* <div className='c-btn-info' onClick={() => onAccept(row._id, row.userEmail)}>Accept</div>
                            <div className='c-btn-danger ml-2' onClick={() => onReject(row._id, row.userEmail)}>Reject</div> */}
                        </div>) 
                    || row._doc.waitStatus ===  2 && 
                        (<div className='d-flex'>
                            {<div>Staking ...</div>}
                        </div>)
                    || row._doc.waitStatus === 3 && 
                        (<div className='d-flex'>
                                <div className='c-btn-info' onClick={() => unStack()}>Approve</div>
                                <div className='c-btn-danger ml-2' onClick={() => onRejectTemp()}>Reject</div>
                        </div>)
                ,
            sortable:true,
        },
    ];

    

    const adminLogOut = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('adminToken');
        let temp = Math.random();
        setStates(temp);
    }

    const renderer = ({ hours, minutes, seconds, completed, start }) => {
        return <span></span>;        
    };

    return (
        <>
        <div className='bg-white' style={{height:'100vh'}}>
            <div className='d-flex justify-between'>
                <h1 className='text-grey p-5 font-weight-light'>Admin page</h1>
                <div className='align-self-center px-3 py-2 d-flex admin-logout mr-c rounded-3' onClick={adminLogOut} ><BiExit className='fs-5 mt-1 mr-3'/>Log Out</div>
            </div>
            <Countdown date={date}
                ref={counterDownRef}
                intervalDelay={STACKINTERVAL}
                onTick={onTick}
                autoStart={true}
                renderer={renderer}
            />
            <div className='mx-5 box-grey p-3'>
                <DataTable
                    columns={columns}
                    data={stackData}
                    sortIcon={(<FaSort/>)}
                    pagination
                    title="Stacking Management"
                    theme="solarized"
                    onRowClicked={onclick}
                    customStyles={customStyles}
                />
            </div>

        </div>
        <ToastContainer
            autoClose={3000}
            closeButton={false}
            closeOnClick
        />
        
        </>
    )
}

export default AdminStack;
