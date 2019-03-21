import ContactServices from '../services/ContactServices';

export default class ContactController {
  static async addContact(req, res) {
    const { email } = req.body;
    const userId = req.user.id;
    const data = { email, userId };
    const response = await ContactServices.addContact(data);

    if (response.status === 201) {
      res.status(201).send(response);
    } else {
      res.status(400).send(response);
    }
  }

  static async getAllUserContacts(req, res) {
    const userId = req.user.id;
    const response = await ContactServices.getAllUserContacts(userId);
    if (response.status === 200) {
      res.status(200).send(response);
    } else {
    /* istanbul ignore next */
      res.status(400).send(response);
    }
  }

  static async deleteContact(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const data = { userId, id };

    const response = await ContactServices.deleteContact(data);
    if (response.status === 202) {
      res.status(202).send(response);
    } else {
      res.status(404).send(response);
    }
  }
}
