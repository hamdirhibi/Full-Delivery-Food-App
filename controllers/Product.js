const express = require ('express'); 
const  Product = require('../models/Product'); 
const  Category = require('../models/Category'); 
const {ProductValidation} = require('../validation')
var fs = require('fs');
const router = express.Router(); 


//getAll product
exports.Product_findAll= async  (req,res)=>{



    try{
        const product = await Product.find(); 
        res.json(product);
    }catch (err){
        res.json({message : err}); 
        console.log(err) ;
    }
}


//get speicific product 
exports.Product_findOne= async (req,res)=>{
    try{
    const product = await Product.findById(req.params.productId); 
    res.json(product); 
    }
    catch(err){
        res.json({message : err});
    }
}



//Create New product 
exports.Product_save=async (req,res)=>{


const {error} = ProductValidation(req.body) ; 

if (error) return res.status(400).send(error.details[0].message) ; 

const category = await Category.findOne({
    name : req.body.category 
})

if (!category) 
    return res
    .status(409)
    .json ({message : 'category not exist'}) ; 


const product = new Product({
   name : req.body.name, 
   price :  req.body.price , 
   category : category._id , 
   image :  req.files[0].originalname , 
   available : req.body.available ,
   unit_qte : req.body.unit_qte , 
   unit_id : req.body.unit_id 
   }); 
    
    try{
    const savedProduct = await Product.create(product).
    then(()=>{
        console.log('product created ');    
    });
    res.status(200).json(product); 
    }catch(err){
        res.json({message : err});
    }

}


//Delete Product 
exports.Product_delete=async (req,res)=>{
    try {
    const removedProduct= await  Product.remove({_id: req.params.productId})
    res.json(removedProduct);
    }
    catch (err ){
        res.json({message : err});
    }
}


//Delete All Product 
exports.Product_deleteAll=async (req,res)=>{
    try {
    const removedProduct= await  Product.deleteMany()
    res.json(removedProduct);
    }
    catch (err ){
        res.json({message : err});
    }
}




//Update  Card  
exports.Update_Name=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            name : req.body.name, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}


exports.Update_Price=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            price : req.body.price, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}


exports.Update_Available=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            available : req.body.available, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}

exports.Update_UnitQte=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            unit_qte : req.body.unit_qte, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}

exports.Update_UnitID=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            unit_id : req.body.unit_id, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}


exports.Update_Category=async (req,res)=>{
    try{
    
        const category = await Category.findOne({
            name : req.body.category 
        })
        
        if (!category) 
            return res
            .status(409)
            .json ({message : 'category not exist'}) ; 
        
        
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            category : category._id, 
         }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}

exports.Update_Image=async (req,res)=>{
    try{
    const updateCard = await Product.updateOne(
        {_id:req.params.productId},
         {$set : {
            image :  req.files[0].originalname , 
        }
     }); 
         res.json(updateCard);
    }catch (err){
        res.json({message : err})
    }
}

