const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('database', 'root', 'Map)0989', {
    host: 'localhost',
    dialect: 'mysql'
});

class User extends Model {}
User.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING }
}, { sequelize, modelName:'user'});

class Student extends Model {}
Student.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'user_id' } },
    room_id: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'student' });

class Staff extends Model {}
Staff.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'user_id' } },
    position: { type: DataTypes.STRING }
}, { sequelize, modelName: 'staff' });

class FeePayment extends Model {}
FeePayment.init({
    transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hostel_id: { type: DataTypes.INTEGER },
    student_id: { type: DataTypes.INTEGER, references: { model: Student, key: 'user_id' } },
    current_year: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.FLOAT }
}, { sequelize, modelName: 'fee_payment' });

class Application extends Model {}
Application.init({
    student_id: { type: DataTypes.INTEGER, references: { model: Student, key: 'user_id' } },
    hostel_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING }
}, { sequelize, modelName: 'application' });

class Room extends Model {}
Room.init({
    room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hostel_id: { type: DataTypes.INTEGER },
    room_no: { type: DataTypes.STRING },
    floor_no: { type: DataTypes.INTEGER },
    empty_seats: { type: DataTypes.INTEGER },
    total_seats: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'room' });

class Food extends Model {}
Food.init({
    hostel_id: { type: DataTypes.INTEGER, primaryKey: true },
    student_count: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'food' });

class Hostel extends Model {}
Hostel.init({
    hostel_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER },
    empty: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'hostel' });

// Defining relationships
User.hasOne(Student, { foreignKey: 'user_id' });
User.hasOne(Staff, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Staff.belongsTo(User, { foreignKey: 'user_id' });
Hostel.hasMany(Room, { foreignKey: 'hostel_id' });
Room.belongsTo(Hostel, { foreignKey: 'hostel_id' });
Student.belongsTo(Room, { foreignKey: 'room_id' });
Application.belongsTo(Student, { foreignKey: 'student_id' });
Application.belongsTo(Hostel, { foreignKey: 'hostel_id' });
FeePayment.belongsTo(Student, { foreignKey: 'student_id' });
FeePayment.belongsTo(Hostel, { foreignKey: 'hostel_id' });
Hostel.hasOne(Food, { foreignKey: 'hostel_id' });

module.exports = { User, Student, Staff, FeePayment, Application, Room, Food, Hostel, sequelize };
