exports = module.exports =function(){
    var mongoose = require("mongoose");
    var UriSting = 'mongodb://localhost/RestApiDB';//define database name
    console.log('Server started');
    var db = mongoose.createConnection(UriSting);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// to create schema like a TABLE (field name:data type );
    var BookSechema = new mongoose.Schema({
        bookid: Number,
        name: String,
        price: Number,
        author:Array

    });
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    var book = db.model('book', BookSechema); //collection name -to-mongooseSchema Relation

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    this.writeData=function(newData,callback){
       var newBook = new book(newData);

        newBook.save(function(err){
            if (err) callback(err);
            else callback(null,"Data Entered sucessfully");
        })

    }


    this.readData=function(bid,callback){
        book.findOne({"bookid":bid}).exec(function(err,result){
            if (err) callback(err);
            else callback(null,result);
        })

    }

    this.readDataAll=function(callback){
        book.find({}).limit(0).exec(function(err,result){
            if (err) callback(err);
            else callback(null,result);
        })

    }

    this.updateData=function(bid,data, callback)
    {
        book.update({bookid:bid}, { $set:data},{multi: false}, function (err, result) {
            if (err) callback(err);
            else callback(null, result);
        })
    }

    this.deleteData=function(bid ,callback){
        book.remove( { bookid:bid },true,function(err,result){
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
