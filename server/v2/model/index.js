import { createUserTable, dropUserTable } from './user';
import { Email } from './email';
import { dropContactTable, createContactsTable } from './contact';
import { dropInboxTable, createInboxTable } from './inbox';
import { dropSentTable, createSentTable } from './sent';
import { dropDraftTable, createDraftTable } from './draft';
import { dropGroupTable, createGroupTable } from './group';
import { dropMemberTable, createMemberTable } from './groupMemebers';

/* istanbul ignore next */
const createAllTables = async () => {
/* istanbul ignore next */
  await createUserTable();
  /* istanbul ignore next */
  await Email.createEmailTable();
  /* istanbul ignore next */
  await createContactsTable();
  /* istanbul ignore next */
  await createInboxTable();
  /* istanbul ignore next */
  await createSentTable();
  /* istanbul ignore next */
  await createDraftTable();
  /* istanbul ignore next */
  await createGroupTable();
  /* istanbul ignore next */
  await createMemberTable();
};

/* istanbul ignore next */
const dropAllTables = () => {
/* istanbul ignore next */
  dropUserTable();
  /* istanbul ignore next */
  Email.dropEmailTable();
  /* istanbul ignore next */
  dropContactTable();
  /* istanbul ignore next */
  dropInboxTable();
  /* istanbul ignore next */
  dropSentTable();
  /* istanbul ignore next */
  dropDraftTable();
  /* istanbul ignore next */
  dropGroupTable();
  /* istanbul ignore next */
  dropMemberTable();
};

export {
  createAllTables, dropAllTables,
};
