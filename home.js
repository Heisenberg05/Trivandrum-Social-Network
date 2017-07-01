const express = require('express')
const app = express()

app.use(express.static('public'));

var Datastore = require('nedb')
var db = new Datastore({filename:'store.db',autoload:true});

app.set('view engine', 'ejs');

app.get('/home', function (req, res) {
	console.log(__dirname);
	res.render('index');
  })

app.get('/login', function (req, res) {
	res.render('login')
  })

app.get('/signup', function (req, res) {
	res.render('signup')
  })

app.get('/login',function (req,res) {
	
	var userName = req.query.username;
	var userPassword = req.query.password;

	var person = {
		"email" : userName,
		"password" : userPassword
	}
	
	db.find({},function (err,result) {
		console.log(result);
		if(result.length>0){
			db.find({},function(err,data){
				res.render('home',{results:data});
			})
		}else{
			res.render('login');

		}
	})
})

app.get('/register',function (req,res) {
	var userFirstName = req.query.firstName;
	var userLastName = req.query.lastName;
	var userName = req.query.username;
	var userPassword = req.query.password;

	var person = {
		"firstname" : userFirstName,
		"lastname" : userLastName,
		"email" : userName,
		"password" : userPassword
	}

	db.insert(person,function(err,result){
		console.log(result);
		res.render('login');
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})