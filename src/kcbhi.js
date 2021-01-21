var express = require('express');
var path = require('path');
var db = require('./db');
var app = express();

app.use(express.static(path.join(__dirname,'/')));
app.set('view engine', 'ejs');

var dbConnection = "postgres://postgres:root@localhost:5432/Phonebook";


// Insert Contact

app.get('/insertContact',async(req,res)=>{
    const date1 ="21/1/2021"
    const date1 ="21/1/2021"
    const arr1 = await db.userModel

})
   