module.exports = function(sequelize, DataTypes) {
    var Parents = sequelize.define("Parents", {
        username: {
            type: DataTypes.STRING,
            // defaultValue: "A"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,40]
            }
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1, 40]
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    Parents.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Parents.hasMany(models.Student, {
            onDelete: "cascade"
        });

        Parents.hasMany(models.Grades, {
            onDelete: "cascade"
        });
    };

    return Parents;
};
