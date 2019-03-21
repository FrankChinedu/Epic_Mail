/* eslint-disable import/prefer-default-export */
import { query, pool } from '../db/index';
import Helpers from '../helpers/Helpers';

class Group {
  /* istanbul ignore next */
  static async createGroupTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
        groups(
          id SERIAL NOT NULL UNIQUE PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          role VARCHAR(128),
          ownerId INTEGER,
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
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
  static async dropGroupTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS groups CASCADE';
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

  static async createGroup({ name, userId }) {
    const qry = 'SELECT * FROM groups WHERE name=$1 AND ownerid=$2';
    const res = await query(qry, [name, userId]);
    if (res.rows[0]) {
      return {
        status: 409,
        message: `You already have a group with name '${res.rows[0].name}'`,
      };
    }

    const dbQuery = `INSERT INTO
      groups(name, ownerid, role)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      name,
      userId,
      'admin',
    ];

    try {
      const { rows } = await query(dbQuery, values);
      return {
        status: 201,
        data: { ...rows[0] },
      };
    } catch (error) {
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async getAllGroup(userId) {
    const dbQuery = 'SELECT id, name, role FROM groups WHERE ownerid=$1';
    const values = [userId];

    try {
      const { rows } = await query(dbQuery, values);
      if (!rows[0]) {
        return {
          success: true,
          data: [],
        };
      }
      return {
        success: true,
        data: rows,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  static async editGroup({ userId, id, name }) {
    const find = 'SELECT * FROM groups WHERE id=$1 AND ownerid = $2';

    try {
      const { rows } = await query(find, [id, userId]);
      if (!rows[0]) {
        return {
          success: false,
          data: 'not found',
        };
      }
      const update = 'UPDATE groups SET name=$1 WHERE ownerid=$2 AND id=$3 returning *';
      const values = [name || rows[0].name, userId, id];
      const response = await query(update, values);
      return {
        success: true,
        data: [
          {
            id: response.rows[0].id,
            name: response.rows[0].name,
            role: response.rows[0].role,
          },
        ],
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }

  static async sendGroupMessage(membersEmails, data) {
    const {
      userId, subject, message, status,
    } = data;
    try {
      await query('BEGIN');
      const dbQuery = `INSERT INTO emails(subject, message, status)
        VALUES($1, $2, $3) returning *`;
      const values = [
        subject,
        message,
        status,
      ];

      const result = await query(dbQuery, values);

      const msg = result.rows[0];
      const messageId = msg.id;

      /* istanbul ignore next */
      await Helpers.asyncForEach(membersEmails, async (recieversEmail) => {
      /* istanbul ignore next */
        const getReceiver = 'SELECT * FROM users WHERE email=$1';
        /* istanbul ignore next */
        const res = await query(getReceiver, [recieversEmail]);
        /* istanbul ignore next */
        const receiverId = res.rows[0].id;

        /* istanbul ignore next */
        const inboxQuery = `INSERT INTO
          inboxs(senderid, receiverid, messageid, read) 
          VALUES ($1, $2, $3, $4) RETURNING * `;

        /* istanbul ignore next */
        const inboxValue = [
          userId,
          receiverId,
          messageId,
          false,
        ];
        await query(inboxQuery, inboxValue);

        /* istanbul ignore next */
        const sentQuery = `INSERT INTO
          sents(senderid, receiverid, messageid, read) 
          VALUES ($1, $2, $3, $4) RETURNING * `;

        /* istanbul ignore next */
        const sentValue = [
          userId,
          receiverId,
          messageId,
          false,
        ];
        await query(sentQuery, sentValue);
      });
      await query('COMMIT');
      return {
        id: messageId,
        createdOn: msg.createdat,
        subject: msg.subject,
        message: msg.message,
        parentMessageId: msg.parentmessageid,
        status: msg.status,
      };
    } catch (e) {
      await query('ROLLBACK');
      return {
        statuc: 500,
        error: 'something went wrong',
      };
    }
  }

  static async deleteGroup({ userId, id }) {
    const dbQuery = 'DELETE FROM groups WHERE id=$1 AND ownerid=$2 returning *';

    try {
      const { rows } = await query(dbQuery, [id, userId]);
      if (!rows[0]) {
        return {
          status: 400,
          data: 'no result',
        };
      }
      return {
        status: 202,
        data: 'deleted successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error,
      };
    }
  }

  static getAllUserContactsFromPassedEmails(emails, userContacts) {
  /* istanbul ignore next */
    const fromEmail = [];

    /* istanbul ignore next */
    emails.forEach((email) => {
    /* istanbul ignore next */
      userContacts.forEach((data) => {
      /* istanbul ignore next */
        if (data.email === email) {
        /* istanbul ignore next */
          fromEmail.push(data);
        }
      });
    });
    /* istanbul ignore next */
    return fromEmail;
  }

  static getMembersNotInGroup(membersInThisGroup, verifiedUsers) {
  /* istanbul ignore next */
    const members = [];

    const membersIdArray = [];
    /* istanbul ignore next */
    membersInThisGroup.forEach((elm) => {
    /* istanbul ignore next */
      membersIdArray.push(elm.memberid);
    });

    /* istanbul ignore next */
    verifiedUsers.forEach((info) => {
    /* istanbul ignore next */
      const isInGroup = membersIdArray.some(id => id === info.id);
      /* istanbul ignore next */
      if (!isInGroup) {
      /* istanbul ignore next */
        members.push(info);
      }
    });
    /* istanbul ignore next */
    return members;
  }

  static async addContactToGroup({ userId, id, emails }) {
    const userContacts = await this.userContacts(userId);
    if (userContacts) {
      const verifiedUsers = this.getAllUserContactsFromPassedEmails(
        emails,
        userContacts,
      );

      if (verifiedUsers.length) {
        const membersInThisGroup = await this.membersInThisGroup(id);

        if (!membersInThisGroup) {
          const res = await this.addNewMembers(verifiedUsers, id);
          if (res.success) {
            return {
              status: 200,
              data: res.data,
            };
          }
          return {
            status: 500,
            data: 'something went wrong',
          };
        }
        const getMembersNotInGroup = this.getMembersNotInGroup(
          membersInThisGroup,
          verifiedUsers,
        );

        if (getMembersNotInGroup.length) {
          const res = await this.addNewMembers(getMembersNotInGroup, id);
          if (res.success) {
            return {
              status: 200,
              data: res.data,
            };
          }
          return {
            status: 500,
            data: 'something went wrong',
          };
        }
        return {
          status: 400,
          data: 'User(s) already exists',
        };
      }
      return {
        status: 400,
        data: 'kindly confirm your emails',
      };
    }
    return {
      status: 400,
      data: 'Kindly try adding some contacts into your contact list',
    };
  }

  static async addNewMembers(data, groupId) {
    const res = {
      success: false,
      data: [],
    };

    const ids = [];
    /* istanbul ignore next */
    data.forEach((x) => {
    /* istanbul ignore next */
      ids.push(x.id);
    });
    /* istanbul ignore next */
    // eslint-disable-next-line consistent-return
    await Helpers.asyncForEach(ids, async (id) => {
    /* istanbul ignore next */
      const dbQuery = `INSERT INTO groupmembers(groupid, memberid, userrole)
      VALUES($1, $2, $3) returning *`;
      try {
      /* istanbul ignore next */
        const { rows } = await query(dbQuery, [
          groupId,
          id,
          'member',
        ]);
        /* istanbul ignore next */
        res.success = true;
        /* istanbul ignore next */
        res.data.push({
          id: rows[0].id,
          userId: rows[0].memberid,
          userRole: rows[0].userrole,
        });
      } catch (err) {
        return {
          err,
        };
      }
    });
    return res;
  }

  static async membersInThisGroup(groupId) {
    const dbQuery = 'SELECT * FROM groupmembers WHERE groupid=$1 ';

    try {
      const { rows } = await query(dbQuery, [groupId]);

      if (rows[0]) {
        return rows;
      }
      return null;
    } catch (err) {
      return {
        err,
      };
    }
  }

  static async userContacts(userId) {
    const dbQuery = 'SELECT * FROM contacts WHERE contact_owner_id=$1';
    const emails = [];
    const { rows } = await query(dbQuery, [userId]);

    if (rows[0]) {
    /* istanbul ignore next */
      rows.forEach((row) => {
      /* istanbul ignore next */
        emails.push({ email: row.email, id: row.id });
      });
      return emails;
    }
    return null;
  }
}

export { Group };
