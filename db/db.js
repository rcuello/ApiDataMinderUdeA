var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb+srv://rcuello:abc123$$@group-mintic.ayatj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


async function getUsers()
{
    mongoClient.connect(url,function(err,client){
        assert.equal(null,err);
        console.log("connected");
    
        var db = client.db("sample_training");
        var collection = db.collection("users");
    
        collection.find({}).toArray((err,users)=>{
            if(err)throw err;
    
            console.log("Existen los siguientes usuarios");
            console.log(users);
    
            client.close();
        });
    });
}



module.exports = {
    getUsers
}
