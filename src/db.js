const mongoose = require("mongoose");
const mongoURL ="mongodb+srv://gourav:3lto7Q2zAZRyp0RV@cluster0.walsm.mongodb.net/khojdeal?retryWrites=true&w=majority";
const {Schema,Model} = require('mongoose');

//mongodb connection

const connect =mongoose.createConnection(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

const userSchema = new mongoose.Schema({
    EMPID: Number,
    EMPNAME: String,
    DOJ: String,
    MOBILENO: Number,
    STATUS: String,
    STATE: String,
    CITY: String,
    DOU:{type:Date,default: new Date()}
  });
  const userModel= connect.model("user",userSchema);
  exports.userModel=  connect.model("user",userSchema);
  
  const newuser= new userModel({
      EMPID:0001,
      EMPNAME:"gourav",
      DOJ: '02/12/2020',
      MOBILENO:9829847310,
      STATUS: false,
      STATE: "RAJ",
      CITY: "Bikaner"
      
  });
   newuser.save();
  
exports.connect = connect;
