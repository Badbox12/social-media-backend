const mongoose = require('mongoose') 

const PostSchema = mongoose.Schema({
    description: {
        type: String,
        default: ''
    },
    image_path: {
        type: String,
        default: '',
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile_picture_path: {
        type: String,
        default: '',
    },
    
}, {timestamps: true});

module.exports = mongoose.model('posts',PostSchema)