import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Chpass(p) {
    const [cpass,setCpass]=useState("");
    const [npass,setNpass]=useState("");
    const [conpass,setConpass]=useState("");
    const [user,setUser]= useState('');
    const navigate= useNavigate();
    const chcode = async (e)=>{
        e.preventDefault();
        // console.log(p); 
        if(p.role!="admin"){
                 const res = await axios.get(`http://localhost:5000/api/adduser/${p.id}`)
                 if(res.data.msg=="success"){
                    setUser(res.data.user)
                    var opass= res.data.adduser.password;
                    
                 }
                 if(opass && opass!=cpass){
                    toast.error("Current password not match or Worng password")
                    setNpass('')
                    setConpass('')
                 }
                 else if(opass==npass){
                    toast.error("Don't Use Previous Password")
                     setNpass('')
                    setConpass('')
                 }
                 else if(npass!=conpass){
                    toast.error("Confirm password Not match")
                     setNpass('')
                    setConpass('')
                 }
                 else{
                    if(p.role!="admin"){
                        const data ={"password":npass};
                       const res2= await axios.put(`http://localhost:5000/api/adduser/${p.id}`,data);
                        if(res2.data.msg=="success"){
                            toast.success("Password change");
                            navigate('/log');

                        }
                        else{
                            toast.error("Something went wrong");
                            setCpass('');
                            setNpass('');
                            setConpass('');
                        
                        }
        
                    }

                 }
        }
       
    }
  return (

      <div>
        <h4 className='text-center mt-4'>Change Password</h4>
      <form action="" onSubmit={chcode} className='w-50 p-5 rounded-3 bg-light mx-auto my-3 shadow-lg '>
           
        <label htmlFor="">Current Password <span className='text-danger fw-bold'>*</span></label>
        <input type="password"  placeholder='Current Password' value={cpass} className='form-control' onChange={(e)=>setCpass(e.target.value)} />
        <br />
        <label htmlFor="">New Password <span className='text-danger fw-bold'>*</span></label>
        <input type="password" placeholder='New Password' className='form-control' value={npass} onChange={(e)=>setNpass(e.target.value)} />
        <br />
        <label htmlFor="">Confirm Password <span className='text-danger fw-bold'>*</span></label>
        <input type="password"  placeholder='Confirm Password' className='form-control' value={conpass} onChange={(e)=>setConpass(e.target.value)} />
        <br />
        <input type="submit" className='btn btn-warning form-control' value="Change Password" />
      </form>
    </div>
  )
}

export default Chpass
