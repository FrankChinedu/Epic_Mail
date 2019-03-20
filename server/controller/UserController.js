import UserServices from '../services/UserServices';

export default class UserController {
  static async createUser(req, res) {
    const data = req.body;
    res.status(201).send(await UserServices.createUser(data));
  }

  static async login(req, res) {
    const data = req.body;
    const response = await UserServices.login(data);

    if (response.status === 401) {
      res.status(401).send(response);
      return;
    }
    res.status(200).send(response);
  }

  static async reset(req, res) {
    const { email } = req.body;

    const response = await UserServices.reset(email);
    res.status(response.status).send(response);
  }

  static async resetPassword(req, res) {
    // console.log('', req);
    const userId = req.user.id;
    const { email } = req.user;
    const { password } = req.body;
    const data = { userId, password, email };

    const response = await UserServices.resetPassword(data);
    res.status(response.status).send(response);
  }
}
