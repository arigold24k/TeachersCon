var orm = require("../config/orm.js");

var parent = {
    retrieve: function(cb) {
        orm.retrieve("Parents", "Grades", "id", "ParentId","Parents.id = 1", function(res){
            cb(res);
        })
    }
};

module.exports = parent;