module.exports = function(sequelize, DataTypes) {
    var Classroom = sequelize.define("Classroom", {
        classroom: {
            type: DataTypes.STRING,
            defaultValue: "A"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 40]
            }
        },
        teachertitle: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });


    return Classroom;
};
