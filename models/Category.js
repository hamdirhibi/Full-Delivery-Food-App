const mongoose = require('mongoose') ; 

const categorySchema = mongoose.Schema({
    id : {
        type : String 
    },
    name : {
        type : String ,
        require : true 
    }
})


module.exports = mongoose.model('category' , categorySchema) ; 
