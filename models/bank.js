const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name: {
    type : String,
    required : true
  },
  username: {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  number: {
    type : Number,
    required : true
  },
  address: {
    type : String,
    required : true
  },
  city: {
    type : String,
    required : true
  },
  userCount: {
    type : Number,
    required : true
  },
  donorCount: {
    type : Number,
    required : true
  },
  bloodQuantity: {
    type : Number,
    required : true
  },
  donors : [Schema.Types.ObjectId],
  users : [Schema.Types.ObjectId]
});

const Bank = mongoose.model('bank', BankSchema);

module.exports = Bank;


{

}
