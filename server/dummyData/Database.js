module.exports = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '12345678',
      createdAt: '2019-03-04',
      updatedAt: '2019-03-04',
    },
    {
      id: 2,
      firstName: 'paul',
      lastName: 'taru',
      email: 'paul@taru.com',
      password: '12345678',
      createdAt: '2019-03-05',
      updatedAt: '2019-03-05',
    },
  ],
  messages: [
    {
      id: 1,
      subject: 'my first inbox subject',
      message: 'my first official inbox message',
      parentMessageId: null,
      status: 'sent',
      createdOn: '2019-03-05',
    },
    {
      id: 2,
      subject: 'first draft',
      message: 'drafted first official message',
      parentMessageId: null,
      status: 'draft',
      createdOn: '2019-03-05',
    },
  ],
  conatcts: [
    {
      id: 1,
      firstName: 'paul',
      lastName: 'taru',
      email: 'paul@taru.com',
      contactOwner: 1,
      createdAt: '2019-03-05',
    },
  ],
  sents: [
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      messageId: 1,
      createdOn: '2019-03-05',
    },
  ],
  inboxs: [
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      messageId: 1,
      read: false,
      createdOn: '2019-03-05',
    },
  ],
  drafts: [
    {
      id: 1,
      senderId: 1,
      messageId: 2,
      receiverId: null,
      createdOn: '2019-03-05',
    },
  ],
};
