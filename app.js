const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

app.prototype.filter = {
	appendSQL: "ORDER BY name",
	sort: []
}

//root route
app.get("/", function(req,res){
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` ORDER BY name";
	
	let conn = tools.createConnection();
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, function(err, results){
			if(err) throw err;
			// Debug
			res.render("index", {"inventory":results});
		});
	});
});

// app.get("/login", function(req, res){
// 	res.render("login");
// });

app.use(express.urlencoded({extended: true}));

app.post("/api/login", function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	let conn = tools.createConnection();
	let sql = "SELECT username, password FROM `admin` WHERE username = ? AND password = ?"
	
	conn.connect(function(err){
    if(err) throw err;
    conn.query(sql, [username, password], function(err, results){
      if(err) throw err;
			console.log(results);
			res.send(
				{
					successful: results.length > 0
				}
			)
    });//query
  });
});

app.get("/api/removeItem", function(req, res){
	let conn = tools.createConnection();
	var sql = "DELETE FROM `inventory` WHERE name = ? AND price = ?";
  var sqlParams = [req.query.name, req.query.price];
	
	 conn.connect(function(err){
    if (err) throw err;
    conn.query(sql, sqlParams, function(err, result){
      if (err) throw err;
			console.log(result);
    });//query
  });//connect
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
});

app.get("/api/sortByPrice", function(req, res){
	let conn = tools.createConnection();
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` WHERE price BETWEEN ? AND ?"
	let sqlParams = [req.query.lower, req.query.upper];
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, sqlParams, function(err, results){
			if(err) throw err;
			res.send(results);
		});
	});
});

app.get("/sortCategory", function(req, res){
	let conn = tools.createConnection();
	let sql = "SELECT name, description, price, category, date, imgSrc FROM `inventory` WHERE category = ?"
	let sqlParams = [req.query.catId];
	conn.connect(function(err){
		if(err) throw err;
		conn.query(sql, sqlParams, function(err, results){
			if(err) throw err;
			res.render("sortedCategory", {"inventory":results});
			console.log(results);
		});
	});
});

app.listen("8081", "0.0.0.0", function(){
   console.log("Express Server is running...")
})

//server listener
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Express server is running...")
// });