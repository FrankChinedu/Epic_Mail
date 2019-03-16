import GroupServices from '../services/GroupServices';

export default class UserController {
  static async createGroup(req, res) {
    const userId = req.user.id;
    const data = { ...req.body, userId };
    const response = await GroupServices.sendGroupMessage(data);
    res.status(201).send(response);
  }
}
