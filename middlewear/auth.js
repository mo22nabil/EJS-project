const userModel = require("../DB/model/User")

const roles = {
    User :'User',
    Admin :'Admin',
    Hr :'Hr',
}
const auth  = (accessRole)=>{
    return async(req,res,next)=>{
    if (!req.session  || !req.session.user?.userID ||!req.session.user?.isLoggedIn ) {
        req.flash('inValidSession',true)
        res.redirect('/login')
    }else{
        const findUser = await userModel.findById(req.session.user.userID).select('-password')
        if (!findUser) {
            req.flash('inValidSession',true)
            res.redirect('/login')
        } else {
            if (!accessRole.includes(findUser.role)) {
                req.flash('inValidSession',true)
                res.redirect('/login')
                
           } else {
                req.session.findUser = findUser;
                next()
           }
        }
    }
}
}


module.exports = {  
    roles,
    auth
}