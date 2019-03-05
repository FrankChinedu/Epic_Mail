import MessageServices from '../services/MessageServices';

export default class MessageController {
  static createMessage(req, res) {
    const userId = 1; // this would be provided from jwt
    const data = { ...req.body, userId };
    const { status } = data;
    let response;

    if (status === 'sent') {
      response = MessageController.sendMessage(data);
    } else {
      response = MessageController.saveAsDraft(data);
    }
    res.status(201).send(response);
  }

  static saveAsDraft(data) {
    return MessageServices.saveDraft(data);
  }

  static sendMessage(data) {
    return MessageServices.sendMessage(data);
  }

  static getRecievedEmails(req, res) {
    const userId = 1; // this would be provided from jwt
    res.status(200).send(MessageServices.getRecievedEmails(userId));
  }
}
