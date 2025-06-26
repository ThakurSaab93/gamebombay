
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/gameBombay_DB')
.then(()=>{
    console.log('db connected');
})

const gameSchema = mongoose.Schema({
  date: String,
  bombay_3pm: String,
  bombay_6pm: String,
  bombay_9pm: String,
  bombay_12am: String,
  bombay_6am: String,
});
module.exports =  mongoose.model('GameEntry', gameSchema);