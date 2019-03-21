/* eslint-disable import/prefer-default-export */
import { query, pool } from '../db/index';
import Helpers from '../helpers/Helpers';

class GroupMember {
  /* istanbul ignore next */
  static async createMemberTable() {
  /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
        groupmembers(
          id SERIAL NOT NULL UNIQUE PRIMARY KEY,
          groupId INTEGER,
          memberId INTEGER,
          userRole VARCHAR(128),
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,
          FOREIGN KEY (memberId) REFERENCES contacts (id) ON DELETE CASCADE
        )`;
    await pool
      .query(queryText)
    /* istanbul ignore next */
      .then(() => {
      /* istanbul ignore next */
        // pool.end();
      })
    /* istanbul ignore next */
      .catch(() => {
      /* istanbul ignore next */
        // pool.end();
      /* istanbul ignore next */
      });
  }

  /* istanbul ignore next */
  static async dropMemberTable() {
  /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS groupmembers CASCADE';
    /* istanbul ignore next */
    await pool
      .query(queryText)
    /* istanbul ignore next */
      .then(() => {
      /* istanbul ignore next */
        // pool.end();
      })
    /* istanbul ignore next */
      .catch(() => {
      /* istanbul ignore next */
        // pool.end();
      });
  }

  static async removeMemberFromGroup({ userId, memberId, groupId }) {
    const getGroup = ' SELECT * FROM groups WHERE ownerid=$1';

    const delQuery = 'DELETE FROM groupmembers WHERE memberid=$1 AND groupid=$2 returning *';

    try {
      const res = await query(getGroup, [userId]);

      const userGroupsIds = [];
      /* istanbul ignore next */
      res.rows.forEach((data) => {
      /* istanbul ignore next */
        userGroupsIds.push(data.id);
      });

      /* istanbul ignore next */
      const userOwnsGroup = userGroupsIds.some(id => parseInt(id, 0) === parseInt(groupId, 0));

      if (userOwnsGroup) {
        const { rows } = await query(delQuery, [memberId, groupId]);
        if (!rows[0]) {
          return {
            status: 404,
            data: 'no result',
          };
        }
        return {
          status: 202,
          data: 'deleted successfully',
        };
      }
      return {
        status: 403,
        data: 'Unauthorized',
      };
    } catch (error) {
      return {
        status: 500,
        error,
      };
    }
  }

  static async retriveMembersEmails({ groupId, userId }) {
    const qry = 'SELECT * FROM groups WHERE id=$1 AND ownerid=$2';

    const res = await query(qry, [groupId, userId]);

    if (!res.rows[0]) {
      return {
        status: 403,
        success: false,
        data: 'Unauthorized',
      };
    }

    const dbQuery = 'SELECT * FROM groupmembers WHERE groupid=$1';
    const { rows } = await query(dbQuery, [groupId]);
    if (!rows[0]) {
      return {
        status: 200,
        success: false,
        data: 'you dont have any members in this group',
      };
    }

    const groupMembersId = [];
    /* istanbul ignore next */
    rows.forEach((member) => {
    /* istanbul ignore next */
      groupMembersId.push(member.memberid);
    });

    const groupMembersEmails = await this.getGroupMembersEmails(groupMembersId);

    return {
      success: true,
      emails: groupMembersEmails,
    };
  }

  static async getGroupMembersEmails(groupMembersId) {
    const groupMembersEmails = [];

    /* istanbul ignore next */
    // eslint-disable-next-line consistent-return
    await Helpers.asyncForEach(groupMembersId, async (id) => {
    /* istanbul ignore next */
      const getQuery = 'SELECT * FROM contacts WHERE id=$1';

      try {
      /* istanbul ignore next */
        const resp = await query(getQuery, [id]);
        /* istanbul ignore next */
        if (resp.rows[0]) {
        /* istanbul ignore next */
          groupMembersEmails.push(resp.rows[0].email);
        }
      } catch (error) {
        return error;
      }
    });

    return groupMembersEmails;
  }
}

export { GroupMember };
