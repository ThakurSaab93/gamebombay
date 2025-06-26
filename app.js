const express= require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const gameRoute = require('./src/routes/gameRoutes');
const adminRoute = require('./src/routes/adminRoute');
const gameModel =require('./src/models/gameModel');
// app.set('views', path.join(__dirname, './src/views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/game', gameRoute)
app.use('/api/admin', adminRoute)
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res)=>{
    const readData = await gameModel.find();
    res.render('home', {readData});
})
app.listen(5000, ()=> {
    console.log('server is running');
})