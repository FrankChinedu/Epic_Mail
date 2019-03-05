import EmailServices from '../services/EmailServices';

export default class EmailController {
  static createUser(req, res) {
    const data = req.body;
    res.status(200).send(EmailServices.createUser(data));
  }
}
