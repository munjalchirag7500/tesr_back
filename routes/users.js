var express = require('express');
var router = express.Router();
let userController=require('../controller/user');

//Get
router.get('/');

//Login
router.get('/login');

//signup
router.get('/signup');


router.get('/getFood/:cat',userController.getFood);

router.post('/booktable',userController.booktable);


module.exports = router;
