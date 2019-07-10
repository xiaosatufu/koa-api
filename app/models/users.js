const mongoose = require('mongoose')
const { Schema,model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: false, default: 0 }
})

module.exports = model('User',userSchema)