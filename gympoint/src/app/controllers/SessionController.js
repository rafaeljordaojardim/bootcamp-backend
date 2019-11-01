// import jwt from 'jsonwebtoken';
import { STATUS_CODES } from 'http';
import schemaValidation from '../../validation/validationSignin';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    if (await schemaValidation.isValid(req.body)) {
      return res.status(400).json({ error: STATUS_CODES[400] });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: STATUS_CODES[404] });
    }
    if (!(await user.checkPassoword(password))) {
      return res.status(401).json({ error: STATUS_CODES[401] });
    }
    const { id, name } = user;
    user.generateToken();
    return res.json({
      id,
      name,
      email,
      token: user.token,
    });
  } // store
}
export default new SessionController();
