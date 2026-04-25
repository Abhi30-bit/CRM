const multer = require('multer');
const store = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/ upload")
    },
    filename:(req,res,cb)=>{
        cd(null,Date.now()+"-"+file.originalname);
    }

})
const upload = multer({store});
module.exports= upload