const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');  
PORT = 5001;
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo2',
    insecureAuthent :true
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('database connected');
    }
})

app.use(session({
    secret:'your_secret_key',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
    res.redirect('/login');

});

app.get('/login', function(req,res){
    res.render('../views/login.ejs');
});


app.post('/login', (req,res)=>{
    const {uname,upass} = req.body;
    console.log(uname,upass);
    const query = 'SELECT * FROM registration WHERE reg_name =? AND reg_password =?';
    db.query(query,[uname,upass],(err,result)=>{
        if (err) throw err;

        if(result.length > 0){
            req.session.uname = uname;
            res.redirect('/home');
        }
        else{
            res.redirect('/login');
        }
    });
});


app.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`);
});


app.get('/register', function(req,res){
    res.render('../views/registration.ejs');
});

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/home', function(req,res){
    if(req.session.uname){
        res.render('../views/home.ejs', {username: req.session.uname});
    }
    else{
        res.redirect('/login');
    }
});
app.post('/register', function(req,res){
    const {uname,upass,uemail} = req.body;
    console.log(uname,upass,uemail);
    const query = 'INSERT INTO registration (reg_name,reg_password,reg_email) VALUES (?,?,?)';
    db.query(query,[uname,upass,uemail],(err,result)=>{
        if(err) throw err;
        res.redirect('/login');
    });
});

app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/login');
});