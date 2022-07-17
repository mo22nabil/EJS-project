const router = require('express').Router()
const { auth } = require('../../middlewear/auth');
const { myMulter, multerPath, multerValidator } = require('../../srervice/multer');
// const validation = require('../../middlewear/validation')
const postController = require('./controller/post');
const endpoint = require('./post.endPoint');

router.get('/home',auth(endpoint.home),postController.home );
router.post('/post',myMulter(multerPath.profilePic,multerValidator.image).single('image') 
,auth(endpoint.home),postController.post );

router.get('/post/:id',auth(endpoint.home),postController.updatePost );
router.post('/post/:id',myMulter(multerPath.profilePic,multerValidator.image).single('image') ,auth(endpoint.home),postController.updatedPost );


router.get('/post/delete/:id',auth(endpoint.home),postController.deletePost);


module.exports = router