import React, { useEffect, useState } from 'react'
import bg1 from '../assets/bg1.jpg'
import av1 from '../assets/av1.png'
import axios from 'axios';
import { toast } from 'react-toastify';
function CounProfile() {

    const [user,setUser]=useState('');
    const [check , setCheck]=useState('');
    const [qua,setQua]=useState('');
    const [skill,setSkill]=useState('');
    const [exp, setExp]=useState('');
    const [address ,setAddress]=useState('');


    const getuser = async ()=>{
        const res= await axios.get(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`);
        if(res.data.msg=="success"){
            setUser(res.data.adduser);
            setAddress(res.data.adduser.address || "---")
            setQua(res.data.adduser.qua || "---")
            setExp(res.data.adduser.exp || "---")
            setSkill(res.data.adduser.skill || "---");
        }
    }

    async function UpdateProfile() {
      if(check){
        const datauser ={qua,exp,skill,address};
        const res = await axios.put(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`,datauser);
        if(res.data.msg=="success"){
          toast.success("Update Success");
            getuser();

        }
        else{
          toast.error("something went wrong")
        }
      }
      
    }

    async function uploadPic(p){
      // console.log(p);
      if(p){
           const res= await axios.patch(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`, {"profilePic":p});
      if(res.data.msg=="success"){
        toast.success("Pic uploaded");
      }
      else{
        toast.error("Something went wrong");
      }

      }
      else{
        toast.error("No image selected");
      }

      
    }

    useEffect(()=>{
            getuser();
    },[])
  return (
    <div>
      <div className="row py-4" style={{backgroundImage:`url(${bg1})`, height:"85vh", backgroundSize:"Cover",overflow:"auto"}}>
        <div className="col-lg-5 p-3 mx-auto rounded-4 shadow-lg" style={{backgroundColor:"white"}}>

<div className="position-relative">
      <img src={av1} className='w-50 h-25 mx-auto d-block rounded-5 shadow' style={{filter:`drop-shadow(5px 5px 10px grey)`}}  alt="" />
          <label htmlFor="profilePic" className='bg-danger'> <i className="fa fa-pen position-absolute  text-danger py-2  bg-dark px-1 text-primary shadow rounded-circle " style={{right:"27%",bottom:"15%" ,width:"30px",boxShadow:"2px 2px 5px inset grey ,2px 2px "}} ></i>
</label>
<input type="file" style={{display:"none"}} onChange={(e)=>{uploadPic(e.target.files[0])}} id='profilePic'  />
</div>
      
           <div className="row mt-5">
            <div className="col-lg-12">
              <h6>Name : {user.name}</h6>
              </div>
            <div className="col-lg-12">

              <h6>
                Mobile: {user.mobile}
              </h6>
            </div>
          
          
            <div className="col-lg-12">
              <h6>Email : {user.email}</h6>
              </div>
            <div className="col-lg-12">

              <h6>
                Role: {user.role}
              </h6>
            </div>
      

           
            <div className="col-lg-12">
              <h6>Center : {user.center}</h6>
              </div>
        

           
            <div className="col-lg-12">
              <h6>Qualification :{check? <input type="text" className='w-100 form-control' value={qua} onChange={(e)=>setQua(e.target.value)} />: qua  || "---"}</h6>
              </div>
       

           
            <div className="col-lg-12">
              <h6>Skills : {check? <input type="text" className='w-100 form-control' value={skill} onChange={(e)=>setSkill(e.target.value)} />: skill || "---"}</h6>
              </div>
         

           
            <div className="col-lg-12">
              <h6>Experience : {check? <input type="text" className='w-100 form-control' value={exp} onChange={(e)=>setExp(e.target.value)} />: exp || "---" }</h6>
              </div>

            <div className="col-lg-12">
              <h6>Address: {check? <textarea type="text" className='w-100 form-control' value={address} onChange={(e)=>setAddress(e.target.value)} />: address || "---" }</h6>
            </div>

            <div className="col-lg-12 mt-2">
              <button className='btn-warning w-100 btn' onClick={()=>{setCheck(!check)  ; UpdateProfile()}} >Update</button>
            </div>
           
 </div>
           





        </div>
        <div className="col-lg-6 mx-auto">
                <div className="row h-50 pb-2">
                    <div className="col-lg-12 p-3 rounded-3 shadow-lg" style={{backgroundColor:"white"}}></div>
                </div>

                <div className="row h-50 pt-2">
                    <div className="col-lg-12 p-3 rounded-3 shadow-lg" style={{backgroundColor:"white"}}></div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default CounProfile
