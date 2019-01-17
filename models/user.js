const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Donor = require('./donor');

const UserSchema = new Schema({
  firstname: {
    type : String ,
    required : true
  },
  lastname: {
    type : String ,
    required : true
  },
  bloodGroup: {
    type : String ,
    required : true
  },
  number: {
    type : Number ,
    required : true
  },
  aadhar: {
    type : String ,
    required : true
  },
  address: {
    type : String ,
    required : true
  },
  city: {
    type : String ,
    required : true
  },
  email: {
    type : String ,
    required : true
  },
  bloodQuantity: {
    type : Number ,
    required : true
  },
  donor : Donor.schema,
  bank_id : {
    type : Schema.Types.ObjectId ,
    required : true
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
