import React, { useState } from 'react'
import Carddash from '../Component/Carddash'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import axios from 'axios';
function Cdash() {
    const [enq, setEnq] = useState('')
    const [enqs, setEnqs] = useState([])
    const [user, setUser] = useState('')
    const [center, setCenter] = useState('')
    const [centers, setCenters] = useState([])
    const [followup, setFollowup] = useState('')
    const [assign, setAssign] = useState('')
    const [follow , setFollow]= useState([]);

    const navigate = useNavigate();



    function validate() {
        if (!localStorage.getItem('Counselor')) {
            navigate('/log');
        }

    }

    // const getcenter = 

    const getadmin = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/stats`);
        if (res.data.msg == "success") {
            const enq = res.data.allenq;
            const user = res.data.user;
            const center = res.data.center;
            const followup = res.data.followup;
            const assign = res.data.assign;
            setCenter(center);
            setUser(user);
            setEnq(enq);
            setFollowup(followup);
            setAssign(assign)
            console.log(enq);
        }
    }
    //center
const getcenter = async () =>{
  const res = await axios.get('http://localhost:5000/api/center');

  if(res.data.msg === 'success'){
    setCenters(res.data.center);
  }
};
const getenq = async () => {
  const res = await axios.get('http://localhost:5000/api/enq');

  if (res.data.msg === 'success') {
    setEnqs(res.data.enq); 
  }
};

const getfollow = async () =>{
  const res = await axios.get('http://localhost:5000/api/followup');

  if(res.data.msg === 'sucess'){
    setFollow(res.data.followup);
  }
}

const name = localStorage.getItem('name');

    useEffect(() => {
        validate();
        getenq();
        getadmin();
        getcenter()
        getfollow()
    }, [])



    return (

        <>
            <div className="row mt-3 shadow   rounded-4 bg-white">
                <div className="col-lg-4">
                    <h5>Complete Report</h5>
                    <p>Quick snapshot of  procees -what you did & whats next</p>
                </div>
                <div className="col-lg-2 mt-3">
                    <select className="form-select" aria-label="Default select example">
                        <option     >2026</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                </div>
                <div className="col-lg-2 mt-3">
                    <input type="date" name="" id="" className='form-control' />
                </div>

                <div className="col-lg-2 mt-3">
                    <input type="date" name="" id="" className='form-control' />
                </div>
                <div className="col-lg-1 mt-3">
                    <button type="button" className="btn text-white" style={{ background: '#ff6d04' }}>Apply</button>
                </div>
                <div className="col-lg-1 mt-3 mb-2">
                    <button type="submit" className="btn btn-outline-primary pe-1 ps-1"  >RESET</button>
                </div>
            </div>

            <div>
                <div className="row mt-3   ">
                    <div className="col-lg-7  shadow    rounded-4 bg-white">
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-between">
                                <div>
                                    Welcome,<span className=' fw-bold '> {name}</span>
                                    <p>Overview</p>
                                    <h6>{enq.length} <span className='fw-semibold'>Enquries</span></h6>
                                </div>



                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <p className='pt-4 pe-2'>Assigned</p>
                                        <h5>{assign}</h5>
                                    </div>

                                    <div>

                                        <label htmlFor=""> Progress</label>
                                        <br />
                                        <input type="range" min={0} max={5} />
                                        <p className="text-end">12% Assigned</p>
                                    </div>
                                </div>




                            </div>
                            <div className="row">
                                <div className="col-lg-4"> <Carddash
                                    title="Today follow-ups"
                                    overdue="Overdue"
                                    num={followup}
                                    duenum=": 2"
                                />
                                </div>
                                <div className="col-lg-4"><Carddash
                                    title="Workshop students"
                                    overdue="Recent"
                                    num="0"
                                    duenum=": 0"
                                /></div>
                                <div className="col-lg-4"><Carddash
                                    title="Registered"
                                    overdue="Total conversions"
                                    num="2"

                                /></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Carddash
                                        title="Centers"
                                        overdue="Active centers"
                                        num={centers.filter((e) => e.status == "Active").length}

                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    
                   <div className="col-lg-4 bg-white shadow rounded-4 " id='daa' >
            <div className="action-card ">
              <div className="header">
                <h5>Action Items</h5>
                <span>What to do next</span>
              </div>
            
              <div className="item">
                <span className="badge">Leads</span>
                <div className="text">
                  <b>3 assigned</b>
                  <p>Assigned across your centers</p>
                </div>
                <button className="btn btn-outline-dark">View Enquiries</button>
              </div>
              
              <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>0 calls due</b>
                  <p>Prioritise overdue first</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>
            
              <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>0 calls due</b>
                  <p>Prioritise overdue first</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>

            </div>
          </div>
          
                </div>

                <div className="row ">
                    <div className="col-lg-12">

                    </div>
                </div>

            </div>
{/* 
            <div className=" col-lg-4 p-2 "> */}
                    {/* <CenterCard heading="Softpro Noida" cirnum="0" cirper="(0%)" cir="0%"  rec="No recent follow-ups"/> */}
                    
            <div className="row my-2 ">
               {
                centers.map((c)=>(
                     <div className="col-lg-4 mt-3 ">
                        <div className="bg-white p-2 rounded-3 shadow pb-5">
                    <div className="row d-flex justify-content-between">

                        <div className="col-lg-6">
                           <p className="fw-bold">{c.name} <br /> {c.address}</p>

                        </div>
                        
                           <div className=" col-lg-6 d-flex justify-content-between">

                            <div className=""> closed
                            <h6>0</h6>
                            (0 %)
                            </div>
                            <div className="circle text-dark mt-2">
                           <h4>25%</h4>
                            </div>
                       
                        </div>
                        </div>
 
                    <div className="row gap-4 d-flex justify-content-center mt-2">
                        <div className="card col-lg-5">
                            <p className='fw-bold'>{enqs.filter((e)=>e.assignto && e.center == c.name).length}
                                <br />
                                Assigned
                            </p>
                        </div>
                           <div className="card col-lg-5">
                            <p className='fw-bold'>{follow.filter((e)=>e.enqid && e.enqid.center === c.name).length}
                                <br />
                               Follow-ups
                            </p>
                        </div>
                        
                    </div>
                    <div className="card mt-2 p-2">
                            <p className='text-danger fw-bold'>{enq.length}
                                <br />
                                <span className='text-dark fw-semibold'>Enquiries</span>
                            </p>
                    </div>

                    <div className="row mt-2">
                        <div className="col-lg-6">
                            <div className="">
                                <button className='btn btn-danger w-100'>Open Enquiries</button>
                            </div>
                        
                        </div>
                        <div className="col-lg-4">
                              <div className="">
                                <button className='btn btn-outline-dark w-100'>Timeline</button>
                            </div>
                        </div>
                    </div>

                    <div className="card my-2 p-2">
                         <div className="content-placeholder">
              {
                follow.map((f)=>(
                f.enqid.center==c.name &&   <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>{f.uid.name}</b>
                  <p>{f.remark}</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>
                ))
              }
            </div>
                    </div>
            </div>
                </div>
                ))
               }
            </div>
            
        </>
    )

}


export default Cdash
