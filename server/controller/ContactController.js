import ContactServices from '../services/ContactServices';

export default class ContactController {
  static async addContact(req, res) {
    const { email } = req.body;
    const userId = req.user.id;
    const data = { email, userId };
    res.status(201).send(await ContactServices.addContact(data));
  }

  static async getAllUserContacts(req, res) {
    const userId = req.user.id;
    const response = await ContactServices.getAllUserContacts(userId);
    res.status(200).send(response);
  }
}
