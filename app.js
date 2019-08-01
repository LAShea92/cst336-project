const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//root route
app.get("/", function(req, res){
    res.render("index");
});//root route

app.get("/itemDetail", function(req,res){
  res.render("detail");
});

app.get("/engines", function(req,res){
  res.render("engines");
});

app.get("/transmissions", function(req,res){
  res.render("transmissions");
});

app.get("/usedParts", function(req,res){
  res.render("usedParts");
});

app.get("/newParts", function(req,res){
  res.render("newParts");
});

app.get("/cart", function(req,res){
  res.render("cart");
});

// app.listen("8081", "0.0.0.0", function(){
//    console.log("Express Server is running...")
// })

//server listener
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Express server is running...")
});