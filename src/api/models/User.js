const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        nome:{type:String}
        ,
        sobrenome:{type:String}
        ,
        rg:{type:String}
        ,
        username:{type:String}
        ,
        password:{type:String}
        });
module.exports = mongoose.model('User', User,"User");



