var express=require("express")
var bodyParser=require("body-parser");
const mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/project1');
var db=mongoose.connection;
db.on('error',function(){
    console.log("db error");
})
db.on('open',function(){
    console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.get("/view",function(req,res){
    app.use(express.static('public'));
    res.sendFile('registrationform.html',{root:__dirname+'/public'});
})
app.post("/sign_up",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var phone=req.body.phone;
    
    var data={
        "name":name,
        "email":email,
        "password":password,
        "phone":phone
    }
    db.collection('form').insertOne(data,function(req,res){});
    res.sendFile('loginform.html',{root:__dirname+'/public'});

})
app.post('/loginform',async(req,res)=>{
    const check=await
    db.collection('form').findOne({name:req.body.name})
    if(check.password === req.body.password)
    {
        res.send("<h1>Login in successfully</h1>")
    }
    else{
        res.send("incorrect password")
    }
});
app.listen('1000',function(){
    console.log("server listening at port 1000");
});