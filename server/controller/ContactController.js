import ContactServices from '../services/ContactServices';

export default class ContactController {
  static async addContact(req, res) {
    const { email } = req.body;
    const userId = req.user.id;
    const data = { email, userId }
    res.status(201).send(await ContactServices.addContact(data));
  }
}
