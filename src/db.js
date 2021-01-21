const mongoose = require("mongoose");
const mongoURL ="mongodb+srv://gourav:3lto7Q2zAZRyp0RV@cluster0.walsm.mongodb.net/khojdeal?retryWrites=true&w=majority";
const {Schema,Model} = require('mongoose');

//mongodb connection

const connect =mongoose.createConnection(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const isNullOrUndefined = (val) => val === null || val === undefined;
    const formatDate=(date)=> {
        if (!isNullOrUndefined(date)) {
          let myDate = new Date(date);
          let month = myDate.getMonth()+1;
          const str = myDate.getDate() + "/" + month + "/" + myDate.getFullYear();
          return str;
        }
        return "";
      }
      const date = formatDate(new Date())

const userSchema = new mongoose.Schema({
    EMPID: Number,
    EMPNAME: String,
    DOJ: {type:String,default:date},
    MOBILENO: Number,
    STATUS: String,
    STATE: String,
    CITY: String,
    DOU:String
  });
  const userModel= connect.model("user",userSchema);
  exports.userModel=  connect.model("user",userSchema);
  
//   const newuser= new userModel({
//       EMPID:0001,
//       EMPNAME:"gourav",
//       DOJ: '02/12/2020',
//       MOBILENO:9829847310,
//       STATUS: false,
//       STATE: "RAJ",
//       CITY: "Bikaner"
      
//   });
//    newuser.save();
  
exports.connect = connect;
