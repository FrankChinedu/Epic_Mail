import MessageServices from '../services/MessageServices';

export default class MessageController {
  static async createMessage(req, res) {
    const userId = req.user.id; // this would be provided from jwt
    const data = { ...req.body, userId };
    const { status } = data;
    let response;

    if (status === 'sent') {
      response = await MessageController.sendMessage(data);
    } else {
      response = await MessageController.saveAsDraft(data);
    }
    res.status(201).send(response);
  }

  static async saveAsDraft(data) {
    return MessageServices.saveDraft(data);
  }

  static async sendMessage(data) {
    return MessageServices.sendMessage(data);
  }

  static getRecievedEmails(req, res) {
    const userId = 1; // this would be provided from jwt
    res.status(200).send(MessageServices.getRecievedEmails(userId));
  }

  static getUnReadEmails(req, res) {
    const userId = 1;
    res.status(200).send(MessageServices.getUnReadEmails(userId));
  }

  static deleteAnInboxMessage(req, res) {
    const userId = 1;
    const { id } = req.params;

    const data = { userId, id };
    res.status(202).send(MessageServices.deleteAnInboxMessage(data));
  }

  static viewAnInboxMessage(req, res) {
    const userId = 1;
    const { id } = req.params;

    const data = { userId, id };
    res.status(200).send(MessageServices.viewAnInboxMessage(data));
  }

  static getSentEmails(req, res) {
    const userId = 1;
    res.status(200).send(MessageServices.getSentEmails(userId));
  }
}
