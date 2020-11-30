var express = require('express');
var router = express.Router();
let userController=require('../controller/user');

//Get
router.get('/');

//Login
router.post('/login',userController.login);

//signup
router.post('/signup',userController.signup);


router.get('/getFood/:cat',userController.getFood);

router.post('/booktable',userController.booktable);

router.post('/orderFood',userController.orderfood);
module.exports = router;
