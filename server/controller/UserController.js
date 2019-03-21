import UserServices from '../services/UserServices';

export default class UserController {
  static async createUser(req, res) {
    const data = req.body;
    const response = await UserServices.createUser(data);
    res.status(response.status).send(response);
  }

  static async login(req, res) {
    const data = req.body;
    const response = await UserServices.login(data);
    res.status(response.status).send(response);
  }

  static async reset(req, res) {
    const { email } = req.body;

    const response = await UserServices.reset(email);
    /* istanbul ignore next */
    res.status(response.status).send(response);
  }

  static async resetPassword(req, res) {
    const userId = req.user.id;
    const { email } = req.user;
    const { password } = req.body;
    const data = { userId, password, email };

    const response = await UserServices.resetPassword(data);
    /* istanbul ignore next */
    res.status(response.status).send(response);
  }
}
