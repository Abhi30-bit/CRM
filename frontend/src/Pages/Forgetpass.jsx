import axios from 'axios'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Forgetpass() {
  const[step ,setStep]=useState(1)
  const [email,setEmail]=useState('')
  const[otp,setOTP]=useState('')
  const[newpassword,setNewPassword]=useState('')
  const[conPassword,setConPassword]=useState('')
  const navigate = useNavigate()

  const sendOTP = async (e)=>{
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/api/otp/send_otp`,{email});
    if(res.data.msg=="success"){
      toast.success("OTP sent")
      setStep(2);
    }
    else{
      toast.error(res.data.msg || "OTP NOT SEND");
    }
  }

  const verifyOtp =async (e)=>{
    e.preventDefault();
    const res = await  axios.post(`http://localhost:5000/api/otp/verify_otp`,{email,otp})
    if(res.data.msg== "success"){
      toast.success("Verification Done ✅");
      setStep(3);

    }else
    {
      toast.error(res.data.msg || "Not verified");
    }
  }

  const resetpass= async(e)=>{
    e.preventDefault();
    if(newpassword != conPassword){
      return toast.error("password Not Match");
    }
    const res= await axios.post(`http://localhost:5000/api/otp/create_pass`,{email,newpassword});
    if(res.data.msg=="success"){
      toast.success("New password Created")
      navigate('/log');

    }else{
      toast.error(res.data.msg || "Password Not Created")
    }
  }
  return (
  <>
  <div className="row">
    <div className="col-lg-5 my-5 mx-auto">
      <h5>Forget password</h5>
      <br />
     {
      step==1 &&(
         <form action="" onSubmit={sendOTP} className='p-5 shadow-lg'>
        <label className='label-control'>Enter Your Email:</label>
        <input type="email" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <br />
        <input type="submit" value="Send OTP" className='btn btn-primary w-100' />
      </form>
      )
     }
      
      {
        step==2 && (
            <form action="" onSubmit={verifyOtp} className='p-5 shadow-lg'>
        <label className='label-control'>Enter Your OTP:</label>
        <input type="text" className='form-control'  value={otp} onChange={(e)=>setOTP(e.target.value)} />
        <br />
        <input type="submit" value="Verify OTP" className='btn btn-primary w-100' />
      </form>
        )
      }
       {
        step==3 && (
            <form action="" onSubmit={resetpass} className='p-5 shadow-lg'>
        <label className='label-control'>Enter Your New Password:</label>
        <input type="password" className='form-control'  value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}  />
        <br />
        <label className='label-control'>Enter  Confirm Password:</label>
        <input type="password" className='form-control'  value={conPassword} onChange={(e)=>setConPassword(e.target.value)}  />
        <br />
        <input type="submit" value="Create Password" className='btn btn-primary w-100' />
      </form>
        )
       }
    </div>
  </div>
  </>
  )
}

export default Forgetpass
