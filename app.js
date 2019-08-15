const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//root route
app.get("/", function(req,res){
  let conn = tools.createConnection();
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` ORDER BY name"
	
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, function(err, results){
			if(err) throw err;
			res.render("index", {"inventory":results});
		});
	});
});

app.get("/api/sortByDate", function(req, res){
	let conn = tools.createConnection();
	let sql ="SELECT name, description, price, category, date, imgSrc FROM `inventory` ORDER BY date"
	
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, function(err, results){
			if(err) throw err;
			res.render("index", {"inventory":results});
		});
	});
})

app.get("/api/sortByPrice", function(req, res){
	let conn = tools.createConnection();
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` WHERE price BETWEEN ? AND ?"
	let sqlParams = [req.query.lower, req.query.upper];
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, sqlParams, function(err, results){
			if(err) throw err;
			res.sent(results);
		});
	});
})

app.get("/api/sortByCategory", function(req, res){
	let conn = tools.createConnection();
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` WHERE category = ?"
	let sqlParams = [req.query.lower];
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, sqlParams, function(err, results){
			if(err) throw err;
			res.sent(results);
		});
	});
})

app.get("/cart", function(req,res){
  res.render("cart");
});

app.listen("8081", "0.0.0.0", function(){
   console.log("Express Server is running...")
})

//server listener
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Express server is running...")
// });