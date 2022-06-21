const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test123",
    database: "employedb",
    multipleStatements:true
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB connetion succeded");
    }
    else{
        console.log("db connection failed\n Eroor: "+JSON.stringify(err,undefined,2));
    }    
    });

app.listen(3000,()=>console.log("Express server is running at port no: 3000"));

//get all data from database
app.get("/employees",(req,res)=>{
mysqlConnection.query('SELECT * FROM employee1',(err,rows,fields) =>{
    if(!err){
        res.send(rows);
    }
    else{ 
        console.log(err);
    }
  });
});


//get particular data from database
app.get("/employees/:id",(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee1 WHERE EmpID=?',[req.params.id],(err,rows,fields) =>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
      });
    });
//delete particular data from database
app.delete("/employees/:id",(req,res)=>{
    mysqlConnection.query('DELETE FROM employee1 WHERE EmpID=?',[req.params.id],(err,rows,fields) =>{
        if(!err){
            res.send("DELETED SUCCESSFULLY");
        }
        else{
            console.log(err);
        }
      });
});
//insert particular data from database
app.post("/employees",(req,res)=>{
    let emp=req.body;
    var sql ="SET @EmpID =?; SET @Name=?; SET @EmpCode=?; SET @Salary=?;\
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";

    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields) =>{
        if(!err){ 
            rows.forEach(element => {
                if(element.constructor==Array)
                res.send("Inserted employee inserted id: "+elemnet[0].EmpID);
            });
        }
        else{
            console.log(err);
        }
      });
    });