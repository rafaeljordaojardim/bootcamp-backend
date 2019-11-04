import mongoose from 'mongoose';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');

const models = [User, File, Appointment];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27018/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

module.exports = new Database();
