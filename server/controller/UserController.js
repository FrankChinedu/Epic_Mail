import UserServices from '../services/UserServices';

export default class UserController {
  static createUser(req, res) {
    const data = req.body;
    res.status(200).send(UserServices.createUser(data));
  }

  static allUsers(req, res) {
    res.status(200).send(UserServices.getAllUsers());
  }
}
