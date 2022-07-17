const mongoose =require('mongoose')

const connectionDB = ()=>{
    return mongoose.connect(process.env.DBURL)
    .then(result=>console.log(`DB running ... ${process.env.DBURL}`))
    .catch(err=>console.log(` fail to connect DB`))
}


module.exports = connectionDB
