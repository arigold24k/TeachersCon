var connection = require("./connection.js");


function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    student: function(teachername, cb) {
        var queryString = "SELECT * FROM Classrooms WHERE Classrooms.username = " + teachername + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            var teacherid = result[0].id;
            connection.query("SELECT * FROM Classrooms LEFT JOIN Grades ON Grades.ClassroomId = Classrooms.id WHERE Grades.ClassroomId =" + teacherid + ";",function (err,res) {
                if(err) {
                    throw err;
                }
                cb(result);
            })

        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols;
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log("this is the query string", queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // data to query information from tables
    retrieve: function(table, secondtable, field,field2, condition, cb) {
        var queryString = "SELECT * FROM " + table;

        queryString += " INNER JOIN ";
        queryString += secondtable;
        queryString += " ON ";
        queryString += table;
        queryString += ".";
        queryString += field;
        queryString += "=";
        queryString += secondtable;
        queryString += ".";
        queryString += field2;
        queryString += " WHERE ";
        queryString += condition;


        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                console.log(err);
            }

            cb(result);
        });
    }
};
module.exports = orm;