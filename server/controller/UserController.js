import UserServices from '../services/UserServices';

export default class UserController {
  static createUser(req, res) {
    const data = req.body;
    res.status(201).send(UserServices.createUser(data));
  }

  static allUsers(req, res) {
    res.status(200).send(UserServices.getAllUsers());
  }

  static login(req, res) {
    const data = req.body;
    const response = UserServices.login(data);

    if (response.status === 403) {
      res.status(403).send(response);
      return;
    }
    res.status(201).send(response);
  }
}
