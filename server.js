const express=require("express")
const mysql=require("mysql")
const cors=require("cors")

const app=express()
app.use(cors());
app.use(express.json())

var db=mysql.createConnection({
     host: "localhost",
     user: "root",
     password:"password",
     database:"signup",
     port:'3306'
     
})
app.post("/signup", (req,res)=>{
    const sql="INSERT INTO login1 (name,email,password) VALUES(?)";
    const inputs=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[inputs],(error,data)=>{
        if(error){
            return res.json("Error")
        }
        return res.json(data)
    })
})
app.post("/login", (req,res)=>{
    const sql="SELECT * FROM login1 WHERE email=? AND password=?"
    db.query(sql,[req.body.email,req.body.password],(error,data)=>{
        if(error){
            return res.json("Error")
        }
        if(data.length>0){
          return res.json("True")
        }
        else{
          return res.json("False")
        }
    })
})
const port=process.env.PORT || 8082
app.listen(port,()=>{
    console.log("Connected")
})