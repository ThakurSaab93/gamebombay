const express = require("express");
const router = express();
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require('../middlewares/auth');

router.get('/signup',  (req, res)=> {
    res.render('register');
});
router.post('/create', async (req, res)=> {  
    try {
        const {name, email, password}= req.body;
        const admin = await adminModel.find();
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
router.get('/login', (req, res)=> {
    res.render('login');
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
                res.redirect('/api/game/add');
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