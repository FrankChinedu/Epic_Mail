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
}
