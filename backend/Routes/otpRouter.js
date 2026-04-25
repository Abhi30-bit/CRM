const express = require('express');
const otpRouter = express.Router();
const nodemailer =require('nodemailer');
const userModal = require('../Modals/userModal');
const tp =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"kumarabhishek19591@gmail.com",
        pass:"dcgj mopy aszr uomi"
    }


});
otpRouter.post('/send_otp',async (req,res)=>{
    try{

const {email}=req.body;
const user = await userModal.findOne({email});
if(!user){
    return res.json({"msg":"user not found"});
}
const otp = Math.floor(100000 + Math.random() * 900000).toString();
user.otp = otp ;
user.otpExpire= Date.now() + (5*60*1000);
user.otpVerified=false;
await user.save();

await tp.sendMail({
    form:"softpro.abbas@gmail.com",
    to:email,

    subject:"OTP Verification",
    text:`Your OTP is ${otp}`
});

res.json({"msg":"success"});
}catch(error){
    return res.json({"msg":"OTP is Not Send","error":error})
}
})
        


otpRouter.post('/verify_otp', async (req,res)=>{
    const {email,otp}=req.body;
    const user = await userModal.findOne({email})
    if(!user){
        return res.json({"msg":"User NOt found"});
    }
    if(user.otp != otp){
        return res.json({"msg":"OTP Not Match"});
    }
    if(user.otpExpire < Date.now()){
        return res.json({"msg":"OTP Expired"});
    }
    user.otpVerified=true;
    user.save();
    res.json({"msg":"success"});
})

otpRouter.post('/create_pass',async (req,res)=>{
    const {email,newpassword}=req.body;
    const user = await userModal.findOne({email});
    if(!user.otpVerified){
    return res.json({"msg":"Not verified"});
    }
    user.password=newpassword;
    user.save();
    return  res.json({"msg":"success"});
})
module.exports=otpRouter;