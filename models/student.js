module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        classroom: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    Student.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint

        Student.belongsTo(models.Parents, {
            foreignKey: {
                allowNull: false
            }
        });

        Student.belongsTo(models.Classroom, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Student;
};
