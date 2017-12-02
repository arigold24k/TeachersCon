var orm = require("../config/orm.js");

var teacher = {
    // gives all teachers in the table
       all: function(cb) {
           orm.all("Classrooms", function(res) {
              cb(res);
           })
       },
       student: function (cb, name) {
           orm.student(name, function(res) {
               cb(res)
           })
       },
       update: function(objColVals, condition, cb) {
            orm.update("Grades", objColVals, condition, function(res) {
                cb(res);
            });
        },
    create: function(cols, vals, cb) {
        orm.create("Grades", cols, vals, function(res) {
            cb(res);
        });


};

module.exports = teacher;