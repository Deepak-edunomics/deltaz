const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('user', userSchema)
