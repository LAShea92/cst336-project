const request = require('request');
const mysql = require('mysql');

module.exports = {

	  createConnection: function(){
    var conn = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "", 
//       database: "img_gallery"
//  			 host: "us-cdbr-iron-east-02.cleardb.net",
//        user: "bfd091ead737ce",
//        password: "70657166", 
//        database: "heroku_9c1ef6a58cc3025"
		host: "us-cdbr-iron-east-02.cleardb.net",
		user: "bec4909ebd438a",
		password: "0b087c71",
		database: "heroku_6e9b70158aa3ec4"
    });
    return conn;
  }//connection
	
}