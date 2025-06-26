const express = require("express");
const router = express();
const gameModel = require("../models/gameModel");
const {isLoggedIn} = require('../middlewares/auth');

router.get('/add', isLoggedIn, (req, res)=> {
    res.render('add');
})

router.post("/create", async (req, res) => {
  try {
    const gameEntry = await gameModel.create({
      date: req.body.date,
      bombay_3pm: req.body.bombay_3pm,
      bombay_6pm: req.body.bombay_6pm,
      bombay_9pm: req.body.bombay_9pm,
      bombay_12am: req.body.bombay_12am,
      bombay_6am: req.body.bombay_6am,
    });
    await gameEntry.save();
    res.redirect('/api/game/read');
  } catch (error) {
    res.send(error.message);
  }
});
router.get('/read', async function(req, res, next) {
  const readData = await gameModel.find();
  console.log(readData);
  res.render('show',{readData});
});
router.get('/edit/:id', async (req, res, next)=>{
 const storeID = await gameModel.findOneAndUpdate({_id:req.params.id}, req.body,{new:true});
 res.render('edit', {storeID});
});
router.post('/edit/:id', async (req, res, next)=>{
  const updateData =  await gameModel.findByIdAndUpdate({_id: req.params.id}, req.body);
  console.log(updateData);
  res.redirect('/api/game/read');
});
router.get('/delete/:id', async (req, res)=>{
 const findID = await gameModel.findByIdAndDelete({_id:req.params.id}, req.body);
 res.redirect('/api/game/read');
});
module.exports =router;