const sql =require("mysql2");

const UserDb=sql.createConnection({
    host:"localhost",
    user:"root",
    database:"bhupendra",
    password:"1234"
});

 UserDb.connect((err)=>{
        if(err) throw err
        console.log("connected")
 });
 module.exports=UserDb
