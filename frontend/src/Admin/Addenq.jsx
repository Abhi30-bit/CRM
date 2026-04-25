import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Addenq() {


const [fullName, setFullName] = useState("");
const [forprogram, setForprogram] = useState("");
const [college, setCollege] = useState("");
const [course, setCourse] = useState("");
const [branch, setBranch] = useState("");
const [email, setEmail] = useState("");
const [year, setYear] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [purposeO, setPurposeO] = useState("");
const [center, setCenter] = useState("");
const [source, setSource] = useState("")
const [centers, setCenters] = useState([]);

const getcenter = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/center");
        if (res.data.msg == "success") {
            var x = res.data.center
            x = x.filter((e) => e.status == 'Active');
            setCenters(x);
        }
    } catch (err) {
        console.log(err)
    }
}

const addenq = async (e) => {
    try {
        e.preventDefault();

        const enq = {
            fullName,
            college,
            course,
            branch,
            email,
            year,
            contactNumber,
            forprogram,
            source,
            center
        }

        const response = await axios.post("http://localhost:5000/api/enq", enq);
        if (response.data.msg === "succes") {
            alert("Enquiry Submitted Successfully");
            setFullName("");
            setCollege("");
            setCourse("");
            setBranch("");
            setEmail("");
            setYear("");
            setSource("");
            setContactNumber("");
            setForprogram("");
            setCenter("");
        }
    } catch (err) {
        console.log(err)
    }
}

useEffect(() => {
    try {
        getcenter();
    } catch (err) {
        console.log(err)
    }
}, [])
  return (
   <>
   <div className="row  d-flex justify-content-center mx-5 px-5 mt-3">
    <div className="col-lg-8 bg-white mx-5 px-4 p-3 shadow rounded-4 ">
        <h5 className='text-center'>Students Enquiry</h5 >
        {/* Form Start */}
 <form onSubmit={addenq} method='post' >

<div className="row  d-flex justify-content-center">
    <div className="col-lg-5 form-floating">
      
       <select name="" id="" className='form-control' value={center} onChange={(e) => { setCenter(e.target.value) }}>
                            <option value="">--select Center--</option>
                            {
                                centers.map((c) => (
                                    <option key={c._id} value={c.name}> {c.name}</option>
                                ))
                            }
                        </select>
                         <label for="floatingInputValue" className='ps-4'>  Select Center </label>
    </div>
    <div className="col-lg-5 form-floating  mt-2 mt-sm-0">
       
        <select className='form-control '  value={source} onChange={(e) => { setSource(e.target.value) }}>
            <option >Walk-in</option>
            <option >Telephonic</option>
             <option >Website</option>
        </select>
         <label for="floatingInputValue" className='ps-4'>Source</label>
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Full name'  value={fullName} onChange={(e) => { setFullName(e.target.value) }}  />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
    
        <input type="text" className='form-control h-100' placeholder='    College'  value={college} onChange={(e) => { setCollege(e.target.value) }} />
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Course'  value={course} onChange={(e) => { setCourse(e.target.value) }} />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
     
        <input type="text" className='form-control h-100' placeholder='   Branch'  value={branch} onChange={(e) => { setBranch(e.target.value) }} />
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Year'  value={year} onChange={(e) => { setYear(e.target.value) }}/>
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
     
        <input type="text" className='form-control h-100'  placeholder='   Contact number'  value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }}/>
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
     
        <input type="text" className='form-control h-100' placeholder='   Email'  value={email} onChange={(e) => { setEmail(e.target.value) }}/>
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0 form-floating">
    
        <select className='form-control h-25'  value={forprogram} onChange={(e) => { setForprogram(e.target.value) }}>
            <option >Select Program</option>
            <option >Full stack</option>
        </select>
         <label for="floatingInputValue" className='ps-4'>Program </label>
    </div>

</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5 ms-5">
       <button type='submit' className=' btn btn-primary rounded-pill w-75'>Save Enquiry</button>
    </div>
 
    
</div>
   </form>
    </div>
   </div>
   </>
  )
}

export default Addenq
