/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {
  accessToken, userFirstname, userLastname, userEmail,
} = localStorage;

const token = window.localStorage.getItem('accessToken');

const unSetToken = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('userEmail');
  window.localStorage.removeItem('userFirstname');
  window.localStorage.removeItem('userLastname');
};

document.querySelector('#user-name').innerHTML = userFirstname;
document.querySelector('#user-email').innerHTML = userEmail;

const isAuthenticated = () => {
  if (accessToken === undefined
     && userFirstname === undefined
     && userLastname === undefined && userEmail === undefined) {
    window.location.href = './signin.html';
  }
};
isAuthenticated();


const logout = () => {
  unSetToken();
  isAuthenticated();
  window.location.href = './signin.html';
};

const formatDate = (time) => {
  let t = new Date(time);
  t = t.toLocaleString();
  return t;
};

const isRead = (read) => {
  if (read) {
    return 'read';
  }
  return 'unread';
};

const readTitle = (read) => {
  if (read) {
    return 'read Message';
  }
  return 'UnRead Message';
};

const deleteSentMessage = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this message');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/messages/sent/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        // getSentMessages();
      });
  }
};

const deleteInboxMessage = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this message');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        // getInboxMessages();
      });
  }
};

const getInboxMessages = () => {
  fetch(`${baseUrl}/api/v1/messages`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const inboxMsg = document.querySelector('#inbox-message');
        const { data } = res;
        if (data.length) {
          data.forEach((inbox) => {
            inboxMsg.innerHTML += `
            <div class="main-flex message-list">
              <span class="col-3 flex"  onclick="openMessage('readMail'); getOneInboxMessage(${inbox.id})" >
                <span class="col-1 arrow-cover flex"><i class="fas fa-arrow-circle-right arrow mr-25"></i>
                  <i class="fas fa-inbox dark-col ml-25"></i>
                </span>
                <span class="col-9 mail-head">${inbox.firstname} ${inbox.lastname}</span>
              </span>
              <article class="col-7 mail-body"  onclick="openMessage('readMail'); getOneInboxMessage(${inbox.id})" >${inbox.subject}</article>
              <span class="col-2 flex justify-content-sb">
                <span class="col-2 center-text start-text" title="delete" onclick="deleteInboxMessage(${inbox.id})" ><i class="fas fa-trash delete"></i></span>
                <span class="col-2 center-text start-text" title="${readTitle(inbox.read)}"><i class="fas fa-check ${isRead(inbox.read)}"></i></span>
                <span class="col-8 center-text start-text">${formatDate(inbox.createdon)}</span>
              </span>
            </div>
            `;
          });
        } else {
          inboxMsg.innerHTML = `
          <div class="main-flex message-list" >
            <article class="col-10 mail-body center-text">Inbox Is Empty until you have new Messages.... </article>
          </div>
          `;
        }
      }
    }).catch((e) => {
      const inboxMsg = document.querySelector('#inbox-message');
      inboxMsg.innerHTML = `
          <div class="main-flex message-list" >
            <article class="col-10 mail-body center-text">An Error or something must have occured try reloading this page. </article>
          </div>
          `;
    });
};

getInboxMessages();

const getSentMessages = () => {
  fetch(`${baseUrl}/api/v1/messages/sent`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const sentMsg = document.querySelector('#sent-message');
        const { data } = res;
        if (data.length) {
          data.forEach((sent) => {
            sentMsg.innerHTML += `
            <div class="main-flex message-list" >
              <span class="col-3 flex" onclick="openMessage('sentMail'); getOnesentMessage(${sent.id})" >
                <span class="col-1 arrow-cover flex"><i class="fas fa-arrow-circle-right arrow mr-25"></i>
                  <i class="fas fa-plane-departure dark-col ml-25" title="sent message"></i>
                </span>
                <span class="col-9 mail-head draft-t">To : ${sent.firstname} ${sent.lastname}</span>
              </span>
              <article class="col-7 mail-body" onclick="openMessage('sentMail'); getOnesentMessage(${sent.id})" >${sent.message} </article>
              <span class="col-2 flex justify-content-sb">
                <span class="col-2 center-text start-text" title="delete" onclick="deleteSentMessage(${sent.id})"  ><i class="fas fa-trash delete"></i></span>
                <span class="col-2 center-text start-text retract" title="Retract this Sent Message"><i class="fas fa-undo"></i></span>
                <span class="col-6 center-text start-text">${formatDate(sent.createdon)}</span>
              </span>
            </div>
            `;
          });
        } else {
          sentMsg.innerHTML = `
          <div class="main-flex message-list" >
            <article class="col-10 mail-body center-text">Sent Box Is Empty until you send some Messages to friends.... </article>
          </div>
          `;
        }
      }
    }).catch((err) => {
      const sentMsg = document.querySelector('#sent-message');
      sentMsg.innerHTML = `
      <div class="main-flex message-list" >
        <article class="col-10 mail-body center-text">An Error or something must have occured try reloading this page. </article>
      </div>
      `;
    });
};

getSentMessages();
