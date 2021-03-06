const {userModel,connect} = require("./db")
// const dashboard =require("./dashboard.ejs")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const formatDate=(date)=> {
    if (!isNullOrUndefined(date)) {
      let myDate = new Date(date);
      let month = myDate.getMonth()+1;
      const str = myDate.getDate() + "/" + month + "/" + myDate.getFullYear();
      return str;
    }
    return "";
  }

//middlewares
 app.use(express.urlencoded({extended: true}));
  app.use(bodyParser.json());
// app.use(express.bodyParser())
const isNullOrUndefined = (val) => val === null || val === undefined;
//dummy getapi
app.get('/request',async(req,res)=>{
    
    res.send('workingn here')
})
//put api to update data
app.put('/updateData',async(req,res)=>{
    const {Employees,status,Message} = req.body;
    if(status){
        //we will use array as a queue FIFO
        const DOU = formatDate(new Date())
       // console.log(DOU)
        for(let i=0;i<Employees.length;i++){
            const findUser= await userModel.findOne({EMPID:Employees[i].EMPID})
           if(isNullOrUndefined(findUser)){
               res.status(404).send({error:"canot find user"})
           }
          // console.log(Employees[i].STATUS);
           findUser.STATUS= Employees[i].STATUS;
           findUser.DOU=DOU;
           await findUser.save();
       }
       res.send(200);
    }else{
        res.sendStatus(404)
    }
    // res.send();
})
//post api to add data
app.post('/addData',async(req,res)=>{
    const {Employees,status,Message} = req.body;
    if(status){
        //we will use array as a queue FIFO
        const DOU = formatDate(new Date())
        for(let i=0;i<Employees.length;i++){
            const findUser= await userModel.findOne({EMPID:Employees[i].EMPID})
           if(!isNullOrUndefined(findUser)){
               res.status(404).send({error:"user id already exits"})
           }
        //    console.log(Employees[i].STATUS);
           const user= new userModel({...Employees})
           user.DOU=DOU;
            findUser.save();
       }
       res.send(200);
    }else{
        res.sendStatus(404)
    }
    // res.send();
})


app.get('/dashboardData',async(req,res)=>{
    const date1 ="21/1/2021"
    const date2 ="22/1/2021"
    const arr1 = await userModel.find({DOU:date1});
    const arrdoj1 = await userModel.find({DOJ:date1});
    const arrdoj2 = await userModel.find({DOJ:date2});
    const arr2 = await userModel.find({DOU:date2});
    const final = [...arr1,...arr2];
    // res.send(final);
    res.render("dashboard.ejs",{arr1,arr2,arrdoj1,arrdoj2})
})


  

app.listen(9999,()=>"app started at 9999")

module.exports=app;