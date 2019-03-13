import { createUserTable, dropUserTable } from './user';

const createAllTables = () => {
  createUserTable();
};

export { createUserTable, dropUserTable, createAllTables };
