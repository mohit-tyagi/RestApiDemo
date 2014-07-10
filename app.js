var express=require('express');
var app=new express();
var UserDB=require('./userDB.js');
var BookDB=require('./bookDB.js');

var MyUserDB=new UserDB();
var MyBookDB=new BookDB();
var bodyParser = require('body-parser');
// parse application/json
//app.use(bodyParser())

app.use(bodyParser.urlencoded({ extended: false }))

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// all request hendler methods....



app.get("/user",function(req,res){
    MyUserDB.readDataAll(function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else res.send(200,JSON.stringify(data));
        res.end();
    })

});
app.get("/user/:uid?",function(req,res){
    var ud=req.params.uid;
    MyUserDB.readData(ud,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else res.send(200,JSON.stringify(data));
        res.end();
    })

});


app.post("/user",function(req,res){
   MyUserDB.writeData(req.body,function(err,data){
        if(err) res.send(404,'Some Error'+err);
       else res.send(200,'Record inserted');
    })

});


app.put("/user/:uid?",function(req,res){
    var ud=req.params.uid;
    MyUserDB.updateData(ud,req.body,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else
        if(data==0) res.send(200,'No record updated');
        else res.send(200,'Record Updated');
    })

});



app.delete("/user/:uid?",function(req,res){
    var ud=req.params.uid;
    MyUserDB.deleteData(ud,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else
        if(data==0) res.send(200,'No record deleted');
        else res.send(200,'Data Deleted');
        res.end();
    })

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



app.get("/book",function(req,res){
    MyBookDB.readDataAll(function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else res.send(200,JSON.stringify(data));
    })

});

app.get("/book/:bid?",function(req,res){
    var bid=req.params.bid;
    MyBookDB.readData(bid,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else res.send(200,JSON.stringify(data));
    })

});


app.post("/book",function(req,res){
   MyBookDB.writeData(req.body,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else res.send(200,'Record inserted');
    })

});


app.put("/book/:bid?",function(req,res){
    var bid=req.params.bid;
   MyBookDB.updateData(bid,req.body,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else
        if(data==0) res.send(200,'No record updated');
        else res.send(200,'Record Updated');
       res.end();
    })

});



app.delete("/book/:bid?",function(req,res){
    var bid=req.params.bid;
    MyBookDB.deleteData(bid,function(err,data){
        if(err) res.send(404,'Some Error'+err);
        else
        if(data==0) res.send(200,'No record deleted');
        else res.send(200,'Data Deleted');
        res.end();
    })

});






//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("*",function(req,res){
   res.send('Opesssssss try again');
    res.end();


});

app.listen(5000);

