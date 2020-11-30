var express = require('express');
var router = express.Router();
let AdminController=require('../controller/admin');
var multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/addFood',upload.single('images'),AdminController.addFood);


router.post('/login',AdminController.login);
router.post('/updateTask',AdminController.updateViewfood);
router.get('/viewfood',AdminController.viewfood);

router.get('/viewtable',AdminController.viewtable);

module.exports = router;
