const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const configAuth = require('../../config/auth');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  async generateToken() {
    this.token = jwt.sign(
      { id: this.id, email: this.email, name: this.name }, // payload
      configAuth.secret_key,
      { expiresIn: configAuth.expiresIn }
    );
  }

  async checkPassoword(password_passed) {
    const res = await bcrypt.compare(password_passed, this.password_hash);
    return res;
  }
}

module.exports = User;
