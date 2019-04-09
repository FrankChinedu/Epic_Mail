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

const userName = document.querySelector('#user-name');
userName.innerHTML = userFirstname;
userName.setAttribute('title', `${userFirstname} ${userLastname}`);
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
        getSentMessages();
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
        getInboxMessages();
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
        inboxMsg.innerHTML = '';
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
        sentMsg.innerHTML = '';
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

const messageContact = (email) => {
  const mail = email;
  createContent();
  const receipient = document.getElementById('receipient');
  receipient.value = mail;
};

const deleteContact = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this contact');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        showAllUserContacts();
      });
  }
};

const addGroup = () => {
  let groupContact = document.querySelector('#groupContact');
  groupContact = groupContact.value.trim();
  if (groupContact.length) {
    const name = groupContact;
    const data = {
      name,
    };
    fetch(`${baseUrl}/api/v1/groups`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        if (res.status === 201) {
          const str = 'group created';
          const head = 'SUCCESS';
          const type = 'success';
          openModal(str, head, type);
          setTimeout(() => {
            closeModal();
          }, 3000);
          showAllUserGroup();
        } else {
          const str = res.message;
          openModal(str);
        }
      }).catch((err) => {
        openModal('An Error must have occurred');
      });
  } else {
    openModal('Field cannot be empty');
  }
};

const deleteGroup = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this group');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/groups/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        showAllUserGroup();
      });
  }
};

const removeMemberFromGroup = (groupId, memberId) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this member from this group');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/groups/${groupId}/users/${memberId}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        const str = 'contact deleted successfully';
        const head = 'SUCCESS';
        const type = 'success';
        openModal(str, head, type);
        setTimeout(() => {
          closeModal();
        }, 3000);
        const groupName = document.querySelector('#grp-name').innerText;
        getGroupMembers(groupId, groupName);
      }).catch((err) => {
        console.log('===>', err);
      });
  }
};

const displayContactOptions = (id) => {
  fetch(`${baseUrl}/api/v1/contacts`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const displayContacts = document.querySelector('#all-contacts');
        const add = document.querySelector('#add-select');
        const btn = document.querySelector('#add-btn');
        add.style.display = 'block';
        btn.style.display = 'block';
        displayContacts.style.display = 'block';
        displayContacts.setAttribute('groupid', id);
        const info = res.data;
        info.forEach((data) => {
          displayContacts.innerHTML += `
            <option value="${data.email}">${data.email}</option>
          `;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addMembersToGroup = () => {
  const contact = document.querySelector('#all-contacts');
  const groupId = contact.getAttribute('groupid');
  if (!contact.options[contact.selectedIndex]) {
  // eslint-disable-next-line no-alert
    alert('You must select at least one contact');
    return;
  }
  // eslint-disable-next-line no-alert
  const confirmed = confirm('You want to add the selected contacts to this group');
  if (confirmed) {
    const arr = Array.from(contact);

    const emails = [];
    arr.forEach((e) => {
      if (e.selected) {
        emails.push(e.value);
      }
    });
    const data = {
      emails,
    };
    fetch(`${baseUrl}/api/v1/groups/${groupId}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          const str = 'Selected contact(s)have been added';
          const head = 'SUCCESS';
          const type = 'success';
          const groupName = document.querySelector('#grp-name').innerText;
          getGroupMembers(groupId, groupName);
          openModal(str, head, type);
          setTimeout(() => {
            closeModal();
          }, 3000);
        } else {
          openModal(res.data);
          setTimeout(() => {
            closeModal();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getGroupMembers = (id, groupName) => {
  fetch(`${baseUrl}/api/v1/groups/${id}/members`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      const grpMember = document.querySelector('#display-group-member');
      grpMember.innerHTML = '';
      if (res.status === 200) {
        const field = res.data;

        grpMember.innerHTML = `
          <div class="flex justify-content-sb" style="margin-bottom: 20px;">
            <h3 id="grp-name">${groupName}</h3>
            <span class="cursor grp-back" onclick="backToList()"><i class="fas fa-arrow-left"></i></span>
          </div>
          <div class="add-member flex align-item-center mb-25 justify-content-ctr">
            <span class="mr-25" id="add-select" style="display:none;">Add</span>
            <select class="mr-25 cursor" id="all-contacts"  multiple size="2" style="display:none;" >
            </select>
            <button class="btn btn-sm ml-25 cursor" id="add-btn" style="display:none;" onclick="addMembersToGroup()" > add </button>
          </div>
          <div class="members-list" id="members-list">
          </div>
        </div>
          `;

        if (field.length) {
          const showMembersEmail = () => {
            const memEmail = document.querySelector('#members-list');
            memEmail.innerHTML = '';
            field.forEach((mem) => {
              memEmail.innerHTML += `
              <div class="a-member flex cursor ">
                <p>${mem.email}</p>
                <span class="cursor" onclick="removeMemberFromGroup(${mem.groupid}, ${mem.memberid})" >x</span>
              </div>
              `;
            });
          };
          showMembersEmail();
        }
        displayContactOptions(id);
      } else {
        grpMember.innerHTML = `
        <div class="flex justify-content-sb" style="margin-bottom: 20px;">
          <h3>${groupName}</h3>
          <span class="cursor grp-back" onclick="backToList()"><i class="fas fa-arrow-left"></i></span>
        </div>
        `;
        displayContactOptions(id);
      }
    })
    .catch((err) => {
      const grpMember = document.querySelector('#display-group-member');
      grpMember.innerHTML = `
          <div class="flex justify-content-sb" style="margin-bottom: 20px;">
            <h3>An Error must have occurred  try again</h3>
            <span class="cursor grp-back" onclick="backToList()"><i class="fas fa-arrow-left"></i></span>
          </div>
          `;
    });
};

const editGroupName = (name) => {
  console.log('name', name);
};

const sendBulkMessage = (id) => {
  console.log('id ==>', id);
};

const showAllUserGroup = () => {
  fetch(`${baseUrl}/api/v1/groups`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      const groups = document.querySelector('#all-user-grps');
      groups.innerHTML = '';
      if (res.status === 200) {
        const result = res.data;
        result.forEach((resp) => {
          groups.innerHTML += `
          <div class="ind-contact group-name ind-contact-width">
            <div class="flex">
              <div class="ab-avatar cursor" onclick="listMember()">
                ${resp.name.charAt(0).toUpperCase()}${resp.name.charAt(1).toUpperCase()}
              </div>
              <div class="contact-info flex align-item-center justify-content-sb" >
                <h4 class="elipsis cursor" onclick="listMember(); getGroupMembers(${resp.id}, '${resp.name}')" >${resp.name}</h4>
                <div class="flex ">
                  <button class="btn btn-sm" onclick="editGroupName('${resp.name}')" >Edit</button>
                  <button class="btn btn-sm btn-success " onclick="sendBulkMessage('${resp.id}')" >Email</button>
                  <button class="btn btn-sm btn-danger " onclick="deleteGroup(${resp.id})" >Delete</button>
                </div>
              </div>
            </div>
          </div>
          `;
        });
      } else {
        // Error html
        groups.innerHTML = `
        <div class="ind-contact group-name ind-contact-width">
          <div class="flex">
            <div class="ab-avatar cursor" >ER</div>
            <div class="contact-info flex align-item-center justify-content-sb" >
              <h4 class="elipsis cursor" >You dont have any groups</h4>
            </div>
          </div>
        </div>
      `;
      }
    }).catch((err) => {
      const groups = document.querySelector('#all-user-grps');
      // Error html
      groups.innerHTML = `
      <div class="ind-contact group-name ind-contact-width">
        <div class="flex">
          <div class="ab-avatar cursor" >Er</div>
          <div class="contact-info flex align-item-center justify-content-sb" >
            <h4 class="elipsis cursor" >An Error must have Occurred</h4>
          </div>
        </div>
      </div>
    `;
    });
};

showAllUserGroup();

const addContact = () => {
  const contactEmail = document.querySelector('#contactEmail');
  if (contactEmail.value) {
    const email = contactEmail.value;
    const data = {
      email,
    };
    fetch(`${baseUrl}/api/v1/contacts`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        const contacts = document.querySelector('#all-user-contact');
        if (res.status === 201) {
          const str = 'Contact added';
          const head = 'SUCCESS';
          const type = 'success';
          openModal(str, head, type);
          setTimeout(() => {
            closeModal();
          }, 3000);
          showAllUserContacts();
        } else {
          const str = res.data;
          openModal(str);
        }
      }).catch((err) => {
        openModal('An Error must have occurred');
      });
  } else {
    openModal('Field cannot be empty and must an email');
  }
};

const showAllUserContacts = () => {
  fetch(`${baseUrl}/api/v1/contacts`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      const contacts = document.querySelector('#all-user-contact');
      contacts.innerHTML = '';
      if (res.status === 200) {
        const result = res.data;
        result.forEach((resp) => {
          contacts.innerHTML += `
          <div class="ind-contact">
            <div class="flex">
              <div class="ab-avatar">${resp.firstname.charAt(0).toUpperCase()}${resp.lastname.charAt(0).toUpperCase()}</div>
              <div class="contact-info flex align-item-center justify-content-sb">
                <h4 class="elipsis">${resp.firstname} ${resp.lastname}</h4>
                <div class="flex ">
                  <button class="btn btn-sm btn-success " onclick="messageContact('${resp.email}')" >Email</button>
                  <button class="btn btn-sm btn-danger " onclick="deleteContact('${resp.id}')" >Delete</button>
                </div>
              </div>
            </div>
          </div>
          `;
        });
      } else {
        // Error html
        contacts.innerHTML = `
        <div class="ind-contact">
          <div class="flex">
            <div class="ab-avatar">Er</div>
            <div class="contact-info flex align-item-center justify-content-sb">
              <h4 class="elipsis">You have no Contacts.</h4>
            </div>
          </div>
        </div>
      `;
      }
    }).catch((err) => {
      const contacts = document.querySelector('#all-user-contact');
      // Error html
      contacts.innerHTML = `
      <div class="ind-contact">
        <div class="flex">
          <div class="ab-avatar">Er</div>
          <div class="contact-info flex align-item-center justify-content-sb">
            <h4 class="elipsis">An Error must have Occurred</h4>
          </div>
        </div>
      </div>
    `;
    });
};

showAllUserContacts();
