module.exports = function(sequelize, DataTypes) {
    var Classroom = sequelize.define("Classroom", {
        classroom: {
            type: DataTypes.STRING,
            defaultValue: "A"
        },
        teacherfirstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        teacherlastname: {
            type: DataTypes.STRING,
            allowNull: false,
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

    Classroom.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Classroom.hasMany(models.Student, {
            onDelete: "cascade"
        });
    };

    return Classroom;
};