import MessageServices from '../services/MessageServices';

export default class MessageController {
  static createUser(req, res) {
    const data = req.body;
    res.status(200).send(MessageServices.createUser(data));
  }
}
