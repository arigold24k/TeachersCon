module.exports = function(sequelize, DataTypes) {
    var Grades = sequelize.define("Grades", {
        username: {
            type: DataTypes.STRING,
            defaultValue: "Name"
        },
        math: {
            type: DataTypes.INTEGER,
            defaultValue: "100"
        },
        reading: {
            type: DataTypes.INTEGER,
            defaultValue: "100"
        },
        science: {
            type: DataTypes.INTEGER,
            defaultValue: "100"
        },
        socialstudies: {
            type: DataTypes.INTEGER,
            defaultValue: "100"
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    Grades.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint

        Grades.belongsTo(models.Student, {
            foreignKey: {
                allowNull: false
            }
        });

        Grades.belongsTo(models.Parents, {
            foreignKey: {
                allowNull: false
            }
        });
    };



    return Grades;
}
