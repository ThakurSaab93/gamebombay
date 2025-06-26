const express = require("express");
const router = express();
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require('../middlewares/auth')
router.get('/', isLoggedIn, (req, res)=> {
    res.send('hello admin');
});
router.post('/create', async (req, res)=> {  
    try {
        const {name, email, password}= req.body;
        const admin = await adminModel.find();
        console.log(admin.length);
        if(admin.length >= 1) return res.send('not authorized');
        bcrypt.hash(password, 10, async function (err, hash) {
            const createAdmin = await adminModel.create({
            name,
            email, 
            password: hash
        });
        const token = jwt.sign({email}, 'secret');
        res.cookie('token', token);
        res.send(createAdmin);
        })
    } catch (error) {
        res.send(error)
    }
});
router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body;
        const admin = await adminModel.findOne({email});        
        if(!admin) return res.send('Email is wrong');
        bcrypt.compare(password, admin.password, function (err, result) {
            if(result){
                const token = jwt.sign({email, id: admin._id}, 'secret');
                res.cookie('token', token);
                res.send('valid admin');
            }else{
                res.send('wrong password')
            }
        })
    } catch (error) {
        res.send(error)
    }
});
router.get('/cookie', isLoggedIn, (req, res)=> {
    console.log(req.cookies.token);
    res.send('cookie ok')
})
router.get('/logout', (req, res)=> {
    res.cookie('token', '');
    res.send('user Logout');
});

module.exports = router;