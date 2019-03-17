import { Contact } from '../model/contact';

export default class UserServices {
  static async addContact(data) {
    return Contact.addContact(data);
  }

  static async getAllUserContacts(userId) {
    return Contact.getAllUserContacts(userId);
  }
}
