module.exports={
    login,
    addFood,
    viewfood,
    viewtable
}
const AdminModel=require('../model/admin');
const FoodModel=require('../model/orderFood');
const TableModel=require('../model/orderTable');
const DishModel=require('../model/dishes');
const jwt=require('jsonwebtoken');

async function login(req,res){
    let email=req.body.email;
    let password=req.body.password;
    AdminModel.findOne({email:email}).
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




async function viewfood(req,res){
    FoodModel.find({}).then(result=>{
        console.log(result);
        res.status(200).json({Message:"Dishes",Food:result})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({Error:"Error"})
    })

}


async function viewtable(req,res){
    TableModel.find({}).then(result=>{
        console.log(result);
        res.status(200).json({Message:"Table",Table:result})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({Error:"Error"})
    })
    


}


async function addFood(req,res){
    let dish=new DishModel({
        food_name:req.body.food_name,
        category:req.body.category,
        cost:req.body.cost,
        image:req.file.filename
    })
    
    dish.save().then((result)=>{
        res.status(200).json({
            dish:result,
            message:req.body
        })
    })
    .catch((err)=>{
        res.status(200).json({
            error:"Error Occured "+err
        })
    })
}