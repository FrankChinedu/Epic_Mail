import GroupServices from '../services/GroupServices';

export default class UserController {
  static async createGroup(req, res) {
    const userId = req.user.id;
    const data = { ...req.body, userId };
    const response = await GroupServices.createGroup(data);
    res.status(response.status).send(response);
  }

  static async getAllGroup(req, res) {
    const userId = req.user.id;
    const response = await GroupServices.getAllGroup(userId);
    res.status(200).send(response);
  }

  static async editGroup(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { name } = req.body;
    const data = { userId, id, name };
    const response = await GroupServices.editGroup(data);
    if (response.status === 200) {
      res.status(200).send(response);
    } else {
      res.status(404).send(response);
    }
  }

  static async deleteGroup(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const data = { userId, id };

    const response = await GroupServices.deleteGroup(data);
    res.status(response.status).send(response);
  }

  static async addContactToGroup(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { emails } = req.body;
    const data = { userId, id, emails };

    const response = await GroupServices.addContactToGroup(data);
    res.status(response.status).send(response);
  }

  static async removeMemberFromGroup(req, res) {
    const userId = req.user.id;
    const { groupId, memberId } = req.params;
    const data = { userId, memberId, groupId };

    const response = await GroupServices.removeMemberFromGroup(data);
    res.status(response.status).send(response);
  }

  static async getAllGroupMembers(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;

    const data = { userId, groupId };
    const response = await GroupServices.getAllGroupMembers(data);
    res.status(response.status).send(response);
  }

  static async sendGroupMessage(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const status = 'sent';
    const { subject, message } = req.body;
    const data = {
      userId, groupId, subject, message, status,
    };

    const response = await GroupServices.sendGroupMessage(data);
    res.status(response.status).send(response);
  }
}
