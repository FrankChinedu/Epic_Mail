import UserServices from '../services/UserServices';

export default class UserController {
  static async createUser(req, res) {
    const data = req.body;
    res.status(201).send(await UserServices.createUser(data));
  }

  static async login(req, res) {
    const data = req.body;
    const response = await UserServices.login(data);

    if (response.status === 403) {
      res.status(403).send(response);
      return;
    }
    res.status(200).send(response);
  }
}
