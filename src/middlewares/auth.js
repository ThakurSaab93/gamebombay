const jwt = require('jsonwebtoken');
const adminModel =require('../models/adminModel');

const isLoggedIn= async (req, res, next)=> {
    if(!req.cookies.token) return res. send('not a valid user');
    const data = jwt.verify(req.cookies.token, 'secret');
    // const admin  = await adminModel.findOne({email: data.email});
    // console.log(admin);
    req.user= data;
    next();
}

module.exports = {isLoggedIn};