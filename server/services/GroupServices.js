import { Group } from '../model/group';

export default class UserServices {
  static async sendGroupMessage(data) {
    const res = await Group.sendGroupMessage(data);

    return {
      status: 201,
      message: 'group created successfully',
      data: [res.data],
    };
  }

  static async getAllGroup(userId) {
    const response = await Group.getAllGroup(userId);
    return {
      status: 200,
      data: response.data,
    };
  }

  static async editGroup(data) {
    const response = await Group.editGroup(data);
    if (response.success) {
      return {
        status: 200,
        data: response.data,
      };
    }
    return {
      status: 404,
      data: response.data,
    };
  }
}
