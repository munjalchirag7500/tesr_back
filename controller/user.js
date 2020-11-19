module.exports={
    login,
    signup,
    orderfood,
    booktable,
    getFood
}


const AdminModel=require('../model/admin');
const FoodModel=require('../model/orderFood');
const TableModel=require('../model/orderTable');
const DishModel=require('../model/dishes');
const UserModel=require('../model/user');
const jwt=require('jsonwebtoken');
async function login(req,res){
    let email=req.body.email;
    let password=req.body.password;
    UserModel.findOne({email:email}).
    then((data)=>{
        data.comparePassword(password,(err,isMatch)=>{
           if (isMatch){ 
               jwt.sign({id:data._id,email:data.email},'Chirag').then((token)=>{
                   console.log(token);
                res.status(200).json({
                    token:token,
                    message:"Loged In"
                })
               })   
        }
        else
        {
            res.status(200).json({
                error:"Wrong Password or User Not Found"
            })
        }
        })
    })
    .catch((err)=>{
        res.status(200).json({
            error:"Wrong Password or User Not Found"
        })
    })
}

async function signup(req,res){
    let user=new UserModel({
        f_name:req.body.f_name,
        l_name:req.body.l_name,
        email:req.body.email,
        password:req.body.password
    })
    user.save().then((result)=>{
        res.status(200).json({
            message:"User Created"
        })
    })
    .catch((err)=>{
        res.status(200).json({
            error:"Error Occured "+err
        })
    })
}


async function orderfood(req,res){
    
    let food=new FoodModel({
        user:req.body.user,
        food_id:req.body.food_id
    })
    // let savedHash=await HasTags.findOneAndUpdate({ 'title': element },
    //         {$push:{'tweets':tweetId}},
    //         {upsert:true,
    //             new:true});
    //         return savedHash;
    //});

}
async function getFood(req,res){
    let cat=req.params.cat;
    console.log(cat);

    DishModel.find({'category':cat}).then((result)=>{
        res.status(200).json({Message:"Dishes",Food:result})
    }).catch((err)=>{
        res.status(200).json({Error:"Error"})
    })
}

async function booktable(req,res){
    
    let table=new TableModel({
        no_of_guest:req.body.no_of_guest,
        date:req.body.date,
        reservation_by:req.body.reservation_by
    })
    table.save().then((result)=>{
        res.status(200).json({
            message:"Table Booked",Table:result
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(200).json({
            error:"Error Occured"
        })
    })

}
