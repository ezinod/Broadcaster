const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    user_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    description:{
        type: String,
        required: true,
        min: 20,
        max: 1000
    }, 
    image_url:{
        type:String,
        min: 6,
        max: 255
    }  
});

module.exports = mongoose.model('Post', postSchema);