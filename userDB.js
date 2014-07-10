exports = module.exports =function(){
    var mongoose = require("mongoose");
    var UriSting = 'mongodb://localhost/RestApiDB';//define database name
    console.log('Server started');
    var db = mongoose.createConnection(UriSting);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// to create schema like a TABLE (field name:data type );
    var UserSechema = new mongoose.Schema({
        uid: Number,
        name: String,
        age: Number

    });
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    var user = db.model('user', UserSechema); //collection name -to-mongooseSchema Relation

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    this.writeData=function(newData,callback){
       var MyUser = new user(newData);

        MyUser.save(function(err){
            if (err) callback(err);
            else callback(null,"Data Entered sucessfully");
        })

    }


    this.readData=function(ud,callback){
        user.findOne({"uid":ud}).exec(function(err,result){
            if (err) callback(err);
            else callback(null,result);
        })

    }

    this.readDataAll=function(callback){
        user.find({}).limit(0).exec(function(err,result){
            if (err) callback(err);
            else callback(null,result);
        })

    }

    this.updateData=function(ud,obj, callback)
    {
        user.update({uid:ud}, { $set:obj},{multi: false}, function (err, result) {
            if (err) callback(err);
            else callback(null, result);
        })
    }

    this.deleteData=function(ud ,callback){
        user.remove( { uid:ud },true,function(err,result){
            if (err) callback(err);
            else callback(null, result);
        });
    }


}


/*
var test=new MyDB();
test.deleteData(101,function(err,res){
    if(err) console.log(err);
    else console.log(res);
});
*/
