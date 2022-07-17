const userModel = require("../../../DB/model/User")
const bcrypt = require("bcryptjs")

const signUp = async(req,res)=>{
    const catchError = req.flash('catchError')[0];
    const emailExist = req.flash('emailExist')[0];
    const oldInputs = req.flash('oldInputs')[0];
    let validationErr = req.flash('validationErr')[0];
    if (validationErr) {
        validationErr = validationErr.map(ele => {
            return ele.path[0]
        })
    }
    res.render('signUp',{emailExist ,oldInputs,catchError,validationErr})
}
const handleSignUp = async(req,res)=>{
    try {
        const {userName , email , password} = req.body
        const user = await userModel.findOne({email})
        if (user) {
            req.flash('emailExist',true)
            req.flash('oldInputs',req.body)
            res.redirect('/')
        } else {
            const hashedpassword = await bcrypt.hash(password , parseInt(process.env.saltRound))
            const newUser = new userModel({userName , email , password:hashedpassword})
            newUser.save()
            res.redirect('/login')
        }
    } catch (error) {
        req.flash('catchError',true)
        req.flash('oldInputs',req.body)
        res.redirect('/')
    }
   
}

///login
const login = async(req,res)=>{
    const catchError = req.flash('catchError')[0];
    const emailExist = req.flash('emailExist')[0];
    const wrongPassword  = req.flash('wrongPassword')[0]
    const oldInputs = req.flash('oldInputs')[0];
    let validationErr = req.flash('validationErr')[0];
    if (validationErr) {
        console.log(validationErr);
        validationErr = validationErr.map(ele => {
            return ele.path[0]
        })
        console.log(validationErr);
    }
    res.render('login',{emailExist ,oldInputs,catchError,validationErr,wrongPassword})
}



const handleSignIn = async(req,res)=>{
    try {
        const { email , password} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            req.flash('emailExist',false)
            req.flash('oldInputs',req.body)
            res.redirect('/login')
        } else {

            const match = await bcrypt.compare(password , user.password)
            if (!match) {
                req.flash('wrongPassword',true)
                req.flash('oldInputs',req.body)
                res.redirect('/login')
            } else {
                req.session.user = {userID : user._id , isLoggedIn :true}
                res.redirect('/home')
            }

        }
    } catch (error) {
        req.flash('catchError',true)
        req.flash('oldInputs',req.body)
        res.redirect('/')
    }
   
}


const logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/login')
}



module.exports = {
    signUp,
    handleSignUp,
    login,
    handleSignIn,
    logout
}
