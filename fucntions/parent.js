var orm = require("../config/orm.js");

var parent = {
    retrieve: function(email1, cb) {
        var condition = "Parents.email = " + email1;
            orm.retrieve("Parents", "Grades", "id", "ParentId", condition, function(res){
            cb(res);
        })
    }
};

module.exports = parent;