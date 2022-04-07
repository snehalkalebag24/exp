const mysql = require('mysql');
const express = require('express');
var app= express();
const bodyparser= require('body-parser');
app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({
    host:'localhost', port:'3307',
    user:'root',
    password: 'Idol@1234',
    database: 'employeedb',
    multipleStatements:true


});

 mysqlConnection.connect((err)=>{
     if(!err)
     console.log('connection success');
     else
     console.log('DB connection failed\n ERRor: ' + JSON.stringify(err,undefined,  2));
 });
 app.listen(3000,()=>console.log('express server is running at port no : 3000'));

//get all emp

 app.get('/employees',(req,res)=>{

    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
 });

 //get a specific emp

 app.get('/employees/:id',(req,res)=>{

    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
 });

 //DEL an employess

 app.delete('/employees/:id',(req,res)=>{

    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
 });

 


  //Inst an employess

  app.post('/employees',(req,res)=>{
    let emp= req.body;

  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; CALL EmployeeAddOrEdit(@EmpID,@name,@EmpCode,@Salary);";

  mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
      if(!err)
          
      rows.forEach(element => {
        if(element.constructor ==Array)
        res.send('Inserted emp ID :' +element[0].EmpID);
      });
      
      else
        console.log(err);
  })
});

//update an emp

app.put('/employees',(req,res)=>{
    let emp= req.body;

  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; CALL EmployeeAddOrEdit(@EmpID,@name,@EmpCode,@Salary);";

  mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
      if(!err)
          
      
        res.send('updates successfully');
     
      
      else
        console.log(err);
  })
});

