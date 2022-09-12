const express = require('express');
const app = express();
const fs = require("fs");
var path=require('path');
const port=80;
const jsonFile = path.join(__dirname, "data.json");
app.use(express.json());
//查询所有
app.get('/list', (req,res) =>{
    fs.readFile(jsonFile, 'utf8', (err, data)=>{
        console.log(data);
        res.end(data);
    })
});

//查询单个
app.get('/detail/:id', (req,res)=>{
    fs.readFile(jsonFile, 'utf8', (err, data) =>{
        data = JSON.parse(data);
        const d = data.filter( x => x.id == req.params.id);
        console.log(d);
        res.end(JSON.stringify(d));
    })
});

//添加
app.post('/add', (req,res)=>{
    fs.readFile(jsonFile,'utf8', (error, data)=>{
        data = JSON.parse(data);
        const resume = {
            'id': data.length +1,
            "name":req.body.name,
            "gender":req.body.gender,
            "birthDay":req.body.birthDay,
            "height" : req.body.height,
            "placeOfBirth": req.body.placeOfBirth,
            "phone": req.body.phone,
            "email":req.body.email,
            "wchat":req.body.wchat,
            "weibo": req.body.weibo,
            "github":req.body.github
        };
        data.push(resume); 
        saveJson(data);   
        res.send(data);
    });
});

//删除
app.get('/delete/:id', (req, res) => {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        data = JSON.parse( data );
        const index = data.findIndex(x => x.id == req.params.id);      
        data.splice(index, 1);       
        console.log(data);
        saveJson(data);
        res.send(data);
    });
 });
 

//保存到文件
function saveJson(data){
    fs.writeFile(jsonFile, JSON.stringify(data), "utf-8", err => {
        if (!err) {
            console.log('写入成功！')
        }else{
            console.log('写入失败！')
        }    
    });    
}

app.use(express.static(path.join('./','public')));
app.listen(port,()=>console.log('Exemple app listening on port 80 !'));
