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
    console.log(email,password);
    UserModel.findOne({'email':email}).select('+password').
    then((data)=>{
        data.comparePassword(password,(err,isMatch)=>{
           if (isMatch){ 
               jwt.sign({id:data._id,email:data.email},'Chirag',((err,token)=>{
                   if(err){
                    throw new Error("Internal Server Error")
                   }
                   else{
                    res.status(200).json({
                        Message:"Logged In",
                        token:token
                    })
                   }
               }))
        }
        else
        {
            console.log(data);
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
    let token= req.headers.authorization.split(' ')[1];
    console.log(token);
        if(token == null){
            return res.status(401).json({error:'Unauthorized'});
        }
        else{
            jwt.verify(token,'Chirag',(err,payload)=>{
                if(err){
               // console.log(err);
                return res.status(401).json({error:'Unauthorized'});
            }
            else{
                console.log("Payload",payload);
                let food=new FoodModel({
                    user:payload.id,
                    foodId:req.body.item
                })
                food.save().then((result)=>{
                    res.status(200).json({
                        message:"Food Ordered"
                    })
                })
            }
            });
        }
      
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
