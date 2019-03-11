export default class Emails {
  constructor() {
    this.id = null;
    this.subject = null;
    this.message = null;
    this.parentMessageId = null;
    this.status = null; // sent, draft
    this.createdOn = new Date();
  }
}
