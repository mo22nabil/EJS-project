const multer = require ("multer");
const path = require ("path");
const {nanoid} = require ("nanoid");
const fs = require ("fs");
const multerPath = {
    profilePic : 'user/profile/pic',
    coverPic : 'user/profile/cov'
}
const multerValidator = {
    image : ['image/png','image/jpg','image/jpeg']
}



function myMulter(customPath,customValidator) {
    if (customPath == null || !customPath ) {
        customPath ='general';
    }
    const fullPath = path.join(__dirname, `../uploads/${customPath}`);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath,{recursive:true});
    }

    const storage = multer.diskStorage({
        destination : function(req,file,cb){
            req.finalDestination = `/uploads/${customPath}`;
            cb(null ,fullPath )
        },
        filename : function(req,file,cb){
            cb(null , nanoid()+"_"+ file.originalname)
        }

    })
    const fileFilter = function(req,file,cb){
        if (customValidator.includes(file.mimetype)) {
            cb(null,true)
        } else {
            req.fileErr = true;
            cb(null,false)
        }
    }
    const upload = multer({dest:fullPath , fileFilter ,storage}) 
    return upload;
}

module.exports  = {myMulter,multerValidator,multerPath}; 