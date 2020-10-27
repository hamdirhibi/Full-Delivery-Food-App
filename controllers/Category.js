const Category = require('../models/Category')

//getAll Categories
exports.Category_findAll = async (req,res)=>{
    try{
        const product = await Category.find(); 
        res.json(product);
    }catch (err){
        res.json({message : err}); 
        console.log(err) ;
    }



}






//get speicific product 
exports.Category_findOne =async (req,res) =>{
    try{
    
    const product = await Product.findById(req.params.productId); 
    res.json(product); 
    }
    catch(err){
        res.json({message : err});
    }
}


//Create New product 
exports.Category_save = async (req,res)=>{

    const category = new Category({
       name : req.body.name, 
       }); 
        
        try{
        const savedCategory = await Category.create(category).
        then(()=>{
            console.log('Category created ');    
        });
        res.status(200).json(savedCategory); 
        }catch(err){
            res.json({message : err});
        }
    
    }
    
    
    //Delete Product 
    exports.Category_delete = async (req,res)=>{
        console.log('category delete')
    try {
        const removedCategory= await  Category.remove({_id: req.params.categoryId})
        res.json(removedCategory);
        }
        catch (err ){
            res.json({message : err});
        }
    }
    
    //Update  Card  
    exports.Category_update = async (req,res)=>{
    try{
        
        const updateCategory = await Category.updateOne(
            {_id:req.params.categoryId},
             {$set : {
                name : req.body.name, 
             }
         }); 
             res.json(updateCategory);
        }catch (err){
            res.json({message : err})
        }
    }

    
    
