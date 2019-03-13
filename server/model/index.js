import { createUserTable, dropUserTable } from './user';

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};

export {
  createUserTable, dropUserTable, createAllTables, dropAllTables,
};
