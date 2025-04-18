

// Node 链接Mongodb数据库 
// Mongoose 

const mongoose = require('mongoose')

// const hostname = "81.69.235.62"
// const hostname = "101.37.23.156"   // LCF IP 
const hostname = "localhost"   // LCF IP 
const port = 27017
const dbname = "myserve" // 数据库名称
const user = '?'
const pwd = "?"

const CONN_DB_URL = `mongodb://${hostname}:${port}/${dbname}`;
// const CONN_DB_URL = `mongodb://${user}:${pwd}@${hostname}:${port}/${dbname}`;

mongoose.set('strictQuery', false)
mongoose.connect(CONN_DB_URL,(err)=>{
    if(err){
        console.log('数据库链接失败')
        console.log(err)
    }else{  
        console.log('数据库链接成功 ' + new Date())
    }
})
