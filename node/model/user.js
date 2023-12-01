const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        cpf: {type: String, required: true, unique: true},
        nome: { type: String, required: true},
        password: {type: String, required: true, select: false},
        created: {type: Date, default: Date.now}
});

userSchema.pre('save', async function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();   
});


module.exports = mongoose.model('User', userSchema)