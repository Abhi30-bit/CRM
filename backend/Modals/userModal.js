const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
       mobile:{
        type:String,
        required:true
    },
       role:{
        type:String,
        required:true
    },
       center:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"1234"
    },
    qua:{
        type:String
    }
    ,
    skill:{
        type:String
    }
    ,exp:{
        type:String
    }
    ,address:{
        type:String
    },
    profilePic:{
        type:String
    },
    status:{
        type:String,
        default:"u"

    },
    otp:String,
    otpExpire:Date,
    otpVerified:{
        type:Boolean,
    default:false
    }
},{
    timestamps:true
})

module.exports= mongoose.model("adduser",userSchema);