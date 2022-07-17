const postModel = require("../../../DB/model/post");

const home =async (req ,res)=>{
    const fileErr =req.flash('fileErr')[0]
    const postList = await postModel.find({});
    res.render('home',{
        postList,
        fileErr
    });
}

const post =async (req ,res)=>{
    if (req.fileErr) {
        req.flash('fileErr',true)
        req.redirect('/home')
    }else{
        const {title ,desc} = req.body;
        const imageURL = `${req.finalDestination}/${req.file.filename}`
    await postModel.insertMany(
        {title 
        ,desc
        ,imageURL 
        ,createdBy : req.session.findUser._id})
        res.redirect('/home');
    }
}


const updatePost =async (req ,res)=>{
    const {id}  = req.params ;
    const post  = await postModel.findById(id)
    res.render('getpost',{
        post
    });
}

const updatedPost =async (req ,res)=>{
    const {id}  = req.params ;
    if (req.fileErr) {
        req.flash('fileErr',true)
        req.redirect(`/post/${id}`)
    }else{
        const {title ,desc} = req.body;
        const imageURL = `${req?.finalDestination}/${req?.file?.filename}`
        await postModel.findByIdAndUpdate({_id :id , createdBy : req.session.findUser._id},{
            title,
            desc,
            imageURL
        })
        res.redirect('/home');
    }
}


const deletePost = async (req ,res)=>{
    const {id}  = req.params ;
    const user = await postModel.findByIdAndDelete({_id:id})
    console.log(user);
    res.redirect('/home');
}

module.exports = {  
    home,
    post,
    updatePost,
    updatedPost,
    deletePost
}