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
	  let conn = tools.createConnection();
		var sql = "SELECT name, description, price, dateAdded, imgSrc FROM `engines` ORDER BY dateAdded"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("engines", {"rows":results});
			});
		});
});

app.get("/transmissions", function(req,res){
	   let conn = tools.createConnection();
		var sql = "SELECT name, price, date, imgSrc FROM `transmissions` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("transmissions", {"rows":results});
			});
		});
});

app.get("/usedParts", function(req,res){
  res.render("usedParts");
});

app.get("/cart", function(req,res){
  res.render("cart");
});

app.get("/adminChanges", function(req,res){
	  let conn = tools.createConnection({multipleStatements: true});
	  var sqlE = "SELECT * FROM `engines` ORDER BY dateAdded"
	  var sqlT = "SELECT * FROM `transmissions` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sqlE, sqlT, function(err, results){
				if(err) throw err;
				res.render("adminChanges", {"rows":results});
			});
		});
});

app.get("/adminSelect", function(req,res){
	res.render("adminSelect");
});

app.listen("8081", "0.0.0.0", function(){
   console.log("Express Server is running...")
})

//server listener
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Express server is running...")
// });