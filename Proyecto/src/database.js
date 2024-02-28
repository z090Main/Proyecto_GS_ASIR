const mysql = require('mysql');
const passport = require('passport');

const connection = mysql.createConnection({
    //propieties
    host: 'localhost',
    user:   'root',
    password:   '123qweASD',
    port:   '3306',
    database: 'project'
})
connection.connect((error) =>{
    //backcall
    if(!!error){
        console.log('Error of mysql connection');
    }else{
        console.log('Data base is Connect');
    }
});

module.exports = connection;