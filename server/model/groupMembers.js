/* eslint-disable import/prefer-default-export */
import { Pool } from 'pg';
import query from '../db/index';

let connectionString;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
/* istanbul ignore next */
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

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
          createdAt TIMESTAMP,
          updatedAt TIMESTAMP,
          FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,
          FOREIGN KEY (memberId) REFERENCES contacts (id) ON DELETE CASCADE
        )`;
    await pool
      .query(queryText)
    /* istanbul ignore next */
      .then(() => {
      /* istanbul ignore next */
        pool.end();
      })
    /* istanbul ignore next */
      .catch(() => {
      /* istanbul ignore next */
        pool.end();
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
        pool.end();
      })
    /* istanbul ignore next */
      .catch(() => {
      /* istanbul ignore next */
        pool.end();
      });
  }

  static async removeMemberFromGroup({ userId, memberId, groupId }) {
    const getGroup = ' SELECT * FROM groups WHERE ownerid=$1';

    const delQuery = 'DELETE FROM groupmembers WHERE memberid=$1 AND groupid=$2 returning *';

    try {
      const res = await query(getGroup, [userId]);

      const userGroupsIds = [];
      res.rows.forEach((data) => {
        userGroupsIds.push(data.id);
      });

      const userOwnsGroup = userGroupsIds.some(id => parseInt(id, 0) === parseInt(groupId, 0));

      if (userOwnsGroup) {
        const { rows } = await query(delQuery, [memberId, groupId]);
        if (!rows[0]) {
          return {
            success: true,
            data: [{
              message: 'no result',
            }],
          };
        }
        return {
          success: true,
          data: [{
            message: 'deleted successfully',
          }],
        };
      }
      return {
        success: false,
        data: [
          {
            message: 'Unauthorized',
          },
        ],
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }
}

export { GroupMember };
