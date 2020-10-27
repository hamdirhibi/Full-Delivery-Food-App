const mongoose = require('mongoose'); 

const productSchema = mongoose.Schema({
   name : {
       type : String , 
       require : true 
   },
   price : {
       type : Number  , 
       require : true 
   },
   image : {
    type : String , 
    require : true 
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      }, 
      available : {
          type : Boolean ,
          require : true 
      },
      unit_qte : {
          type : Number ,  
          require : true 
      },
      unit_id  : {
            type  : String , 
            require : true  
      }
})


module.exports = mongoose.model('Product',productSchema);