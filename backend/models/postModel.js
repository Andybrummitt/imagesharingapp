const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}) 

module.exports = mongoose.model('Post', postSchema);