import { Contact } from '../model/contact';

export default class UserServices {
  static async addContact(data) {
    const res = await Contact.addContact(data);
    if (res.success) {
      return {
        status: 201,
        data: res.data,
      };
    }
    return {
      status: 400,
      data: res.data,
    };
  }

  static async getAllUserContacts(userId) {
    const res = await Contact.getAllUserContacts(userId);
    if (res.success) {
      return {
        status: 200,
        data: res.data,
      };
    }
    return {
      status: 400,
      data: res.data,
    };
  }

  static async deleteContact(data) {
    const res = await Contact.deleteContact(data);
    if (res.success) {
      return {
        status: 202,
        data: res.data,
      };
    }
    return {
      status: 404,
      data: res.data,
    };
  }
}
