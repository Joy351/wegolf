// const mysql = require('mysql');
// const connection = mysql.createConnection({
// host: 'localhost',
// user: 'root',
// password: '',
// database: 'wegolf'
// });
// connection.connect((err) => {
// if (err){
//     console.log('Error connecting to Db');
//     return;
// };
// console.log('Connected!');
// });
// connection.end((err) => {});

// connection.query('SELECT * FROM users_68729', (err,rows) => {
//     if(err) throw err;
//     console.log('Data received from Db:');
//     console.log(rows);
// });
// const users_68729 = { firstname: 'Jude', lastname: 'Mow' ,email:'jo@gmail.com'};
// connection.query('INSERT INTO users_68729 SET ?', users_68729, (err, res) => {
// if(err) throw err;

// console.log('Last insert ID:', res.id);
// });


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'wegolf'
});

//connect to database
conn.connect((err) =>{
if(err) throw err;
console.log('Mysql Connected...');
});

//show all users
app.get('/wegolf/users_68729',(req, res) => {
  let sql = "SELECT * FROM user_68729";
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//show single user
app.get('/wegolf/users_68729/:id',(req, res) => {
  let sql = "SELECT * FROM users_68729 WHERE id="+req.params.id;
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//add new user
app.post('/wegolf/users_68729',(req, res) => {
let data = {firstname: req.body.firstname, lastname: req.body.lastname, email:req.body.email, password:req.body.password};
let sql = "INSERT INTO users_68729 SET ?";
let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//update 
app.put('/wegolf/users_68729/:id',(req, res) => {
let sql = "UPDATE users_68729 SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email='"+req.body.email+"'WHERE id="+req.params.id;
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//Delete 
app.delete('/wegolf/users_68729/:id',(req, res) => {
let sql = "DELETE FROM users_68729 WHERE id="+req.params.id+"";
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//Server listening
app.listen(3000,() =>{
console.log('Server started on port 3000...');
});