const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('hostel_management', 'root', 'Map)0989', {
    host: 'localhost',
    dialect: 'mysql'
});

class User extends Model { }

User.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user',  // 👈 Explicitly define the table name to avoid pluralization
    timestamps: false  // 👈 This will add createdAt & updatedAt automatically
});


async function initialize() {
    try {
        // Sync model with database (ensure table is created)
        await sequelize.sync({ force: true }); // ⚠️ WARNING: This deletes existing data
        console.log("User table created successfully!");

        // Insert User after the table is created
        await sequelize.query(`
            INSERT INTO user (user_name, email, password, address, role, phone)
            VALUES ('John Doe', 'john@example.com', 'securepassword', '123 Street', 'student', '9876543210');
        `);
        console.log("User added successfully!");

    } catch (err) {
        console.error("Error:", err);
    }
}

// Call the function to initialize DB and insert data
initialize();

module.exports = User;
