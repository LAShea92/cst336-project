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
  res.render("adminChanges");
});

app.get("/adminSelect", function(req,res){
	res.render("adminSelect");
});

app.get("/engineRemove", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `engines` ORDER BY dateAdded"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("engineRemove", {"rows":results});
			});
		});
});

app.get("/transmissionRemove", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `transmissions` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("transmissionRemove", {"rows":results});
			});
		});
});

app.get("/usedPartRemove", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `used_parts` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("usedPartRemove", {"rows":results});
			});
		});
});

app.get("/engineEdit", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `engines` ORDER BY dateAdded"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("engineEdit", {"rows":results});
			});
		});
});

app.get("/transmissionEdit", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `transmissions` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("transmissionEdit", {"rows":results});
			});
		});
});

app.get("/usedPartEdit", function(req,res){
	let conn = tools.createConnection();
		var sql = "SELECT * FROM `used_parts` ORDER BY date"

		conn.connect(function(err){
			if(err) throw err;
			conn.query(sql, function(err, results){
				if(err) throw err;
				res.render("usedPartEdit", {"rows":results});
			});
		});
});

app.get("/changeConfirm", function(req,res){
	res.render("changeConfirm");
});

app.get("/api/addItems", function(req, res){
	var conn = tools.createConnection();
	var sql;
	var sqlParams;
	
	if (req.query.partType=="engine"){
		sql = "INSERT INTO engines (name,series,description,price,miles) VALUES (?,?,?,?,?)"
		sqlParams = [req.query.name, req.query.series, req.query.description, req.query.price, req.query.miles]
	}
	else if (req.query.partType=="transmission"){
		sql = "INSERT INTO transmissions (name,series,price,quantity) VALUES (?,?,?,?)"
		sqlParams = [req.query.name, req.query.series, req.query.price, req.query.quantity]
	}
	else if (req.query.partType=="usedPart"){
		sql = "INSERT INTO used_parts (name,usedPartType,price,description) VALUES (?,?,?,?)"
			sqlParams = [req.query.name, req.query.usedPartType, req.query.price, req.query.description]
	}
});

app.listen("8081", "0.0.0.0", function(){
   console.log("Express Server is running...")
})

//server listener
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Express server is running...")
// });