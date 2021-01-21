var express = require('express');
var path = require('path');
var db = require('./db');
var app = express();

app.use(express.static(path.join(__dirname,'/')));
app.set('view engine', 'ejs');

var dbConnection = "postgres://postgres:root@localhost:5432/Phonebook";


// Insert Contact

app.get('/insertContact',function(req,res){
    var dbClient = new db.Client(dbConnection);

    dbClient.connect(function(err){
        if(err)
            throw err;

        var query = "insert into Contacts (fullname,phone,mobile,address) values ($1,$2,$3,$4)";
        var fullname = req.query.fullname;
        var phone = req.query.phone;
        var mobile = req.query.mobile;
        var address = req.query.address;

        var contact = [fullname , phone , mobile , address];

        dbClient.query(query , contact , function(err){
            if(err)
                throw err;
            else {
                console.log('Contact Inserted!')    ;
                res.redirect('/');      
                res.end();
       
