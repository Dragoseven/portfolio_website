const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exp = require('constants');
const connection = require("C:/Users/drago/OneDrive/Desktop/cyber_projects/resume_site-main/db.js");


const app = express();
app.use(express.urlencoded({extended:false}))

const PORT = 3000;

app.unsubscribe(express.static(path.join(__dirname,"static")));
app.use(express.static('public'));


app.get("/views/home.html",(req,res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/views/projects.html",(req,res) => {
    res.sendFile(__dirname + "/views/projects.html");
});

app.get("/views/login.html",(req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.post("/api", function(req,res) {
    console.log(req.body)
    const username = req.body.user
    const password = req.body.password
    connection.query("INSERT INTO sql_injection (user, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
        console.log(err);
    }

    )
})

app.post("/login", function(req, res){
    const username1 = req.body.user1
    const password1 = req.body.password1
    connection.query("SELECT * FROM sql_injection WHERE user = '" + req.body.user1 + "' AND password = '" + req.body.password1 + "'",
    [username1, password1],
    (err, result) => {
        if (err){
            res.send({err: err})
        }
        if (result.length > 0) {
            res.send({Message:"Logged In"})
        }else{
            res.send({Message: "Wrong username or password"})
        }
    }
    );
})

app.listen(PORT,function(){
    console.log("Server is working :) !")
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database is working')
    })
})