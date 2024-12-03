//importing Multer For File Uploads
const multer = require("multer")
// importing the package for paths
const path = require("path");

const storage = multer.diskStorage({
    destination:function(req,file,cb){

     cb(null, path.join(__dirname,'uploads'))
    },
    filename:function(req,file,cb){
      cb(null,Date.now() + '-'+file.originalname) 
    }
  });

  const upload = multer({storage:storage})
  
  module.exports = upload;