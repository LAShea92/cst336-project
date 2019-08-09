const request = require('request');
const mysql = require('mysql');

module.exports = {

	  createConnection: function(){
    var conn = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "", 
       database: "img_gallery"
//  			 host: "us-cdbr-iron-east-02.cleardb.net",
//        user: "bfd091ead737ce",
//        password: "70657166", 
//        database: "heroku_9c1ef6a58cc3025"
    });
    return conn;
  }//connection
	
}