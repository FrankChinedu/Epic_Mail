import { Group } from '../model/group';
import { GroupMember } from '../model/groupMembers';

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

  static async deleteGroup(data) {
    const response = await Group.deleteGroup(data);
    if (response.success) {
      return {
        status: 202,
        data: response.data,
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }

  static async addMembersToGroup(data) {
    const res = await Group.addMembersToGroup(data);
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

  static async removeMemberFromGroup(data) {
    const res = await GroupMember.removeMemberFromGroup(data);

    if (res.success) {
      return {
        status: 202,
        data: res.data,
      };
    }
    return {
      status: 403,
      data: res.data,
    };
  }
}
