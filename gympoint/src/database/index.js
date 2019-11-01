import Sequelize from 'sequelize';
import configDB from '../config/database';
import User from '../app/models/User';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDB);
    User.init(this.connection);
  }
}

export default new Database();
