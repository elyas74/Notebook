/**
 * Created by danial on 10/2/16.
 */
var db = require("mongo_schemas");
var ObjectId = require('mongodb').ObjectID;
module.exports.post = function(req,res){
  var data = req.body;
    var name  = req.session.username;
    var id = data._id;
    db.users.findOne({$and: [{username : name},{favorite : ObjectId(id)}]},{},function(err,info){
        if(err){
            console.mongo(err);
            console.error(err);
            res.sendStatus(500);
        }
        else {
            var index = info.favorite.indexOf(data._id);
            info.favorite.splice(index,1);
            info.save(function(err){
               if(err){
                   console.mongo(err);
                   console.error(err);
                   res.sendStatus(500);
               }
               else{
                   res.send("ok");
               }
            });

        }
    });
};