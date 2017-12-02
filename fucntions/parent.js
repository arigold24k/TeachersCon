var orm = require("../config/orm.js");

var parent = {
    retrieve: function(condition, cb) {
        orm.retrieve("Parents", "Grades", "Parents.id", "Grades.ParentId", condition, function(res){
            cb(res);
        })
    }
};

module.exports = parent;