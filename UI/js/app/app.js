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

const deleteDraft = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to delete this draft');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/messages/draft/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        getDraftMessages();
      });
  }
};

const getDraftMessages = () => {
  fetch(`${baseUrl}/api/v1/messages/draft`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const draftMsg = document.querySelector('#draft-message');
        draftMsg.innerHTML = '';
        const { data } = res;
        if (data.length) {
          data.forEach((draft) => {
            draftMsg.innerHTML += `
            <div class="main-flex message-list" >
              <span class="col-3 flex" onclick="openDraft(${draft.id})">
                <span class="col-1 arrow-cover flex"><i class="fas fa-arrow-circle-right arrow mr-25"></i>
                  <i class="fas fa-bookmark dark-col ml-25"></i>
                </span>
                <span class="col-10 mail-head draft-t">DRAFT</span>
              </span>
              <article class="col-7 mail-body" onclick="openDraft(${draft.id})" >${draft.message}</article>
              <span class="col-2 flex justify-content-sb">
                <span class="col-2 center-text start-text" title="delete" onclick="deleteDraft(${draft.id})"  ><i class="fas fa-trash delete"></i></span>
                <span class="col-8 center-text start-text">${formatDate(draft.createdon)}</span>
              </span>
            </div>
            `;
          });
        } else {
          draftMsg.innerHTML = `
          <div class="main-flex message-list" >
            <article class="col-10 mail-body center-text">Draft Box Is Empty until you save some Messages as draft.... </article>
          </div>
          `;
        }
      }
    }).catch((err) => {
      const draftMsg = document.querySelector('#draft-message');
      draftMsg.innerHTML = `
      <div class="main-flex message-list" >
        <article class="col-10 mail-body center-text">An Error or something must have occured try reloading this page. </article>
      </div>
      `;
    });
};

getDraftMessages();

const retractMessage = (id) => {
  // eslint-disable-next-line no-alert
  const confirmed = confirm('Are You sure you want to retract this message');
  if (confirmed) {
    fetch(`${baseUrl}/api/v1/messages/retract/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        openModal(res.data, 'SUCCESS', 'success');
        getSentMessages();
      });
  }
};

const openResendForm = (id) => {
  const body = document.querySelector('#resend-body');
  const display = document.querySelector('#resend-display');
  const head = document.querySelector('#resend-head');
  const value = 'none';

  if (body.style.display === value) {
    body.style.display = 'block';
    display.style.display = 'block';
    head.style.display = 'flex';

    fetch(`${baseUrl}/api/v1/messages/sent/${id}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          body.setAttribute('messageid', id);
          const data = {
            email: res.data.email,
            subject: res.data.subject,
            message: res.data.message,
          };
          fillResendForm(data);
        } else {
          openModal('An error must have occured');
        }
      }).catch((e) => {
        openModal('An error must have occurred try again');
      });
  } else {
    display.style.display = value;
    body.style.display = value;
    head.style.display = value;
  }
};

const fillResendForm = (data) => {
  const receipient = document.getElementById('resend-receipient');
  const subject = document.getElementById('resend-subject');
  const textArea = document.getElementById('resend-text-area');

  receipient.value = data.email;
  subject.value = data.subject;
  textArea.innerText = data.message;
};

const closeResendForm = () => {
  const body = document.querySelector('#resend-body');
  const display = document.querySelector('#resend-display');
  const head = document.querySelector('#resend-head');
  const value = 'none';
  display.style.display = value;
  body.style.display = value;
  head.style.display = value;
};

const resendMessage = () => {
  let recieversEmail = document.getElementById('resend-receipient').value;
  const subject = document.getElementById('resend-subject').value;
  const message = document.getElementById('resend-text-area').value;
  const body = document.querySelector('#resend-body');
  const status = 'sent';
  recieversEmail = recieversEmail.trim();

  const validate = () => {
    // eslint-disable-next-line no-useless-escape
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (recieversEmail === '' || !re.test(recieversEmail)) {
      const str = 'receipient must not be empty and you must be a valid email';
      openModal(str);
      setTimeout(() => {
        closeModal();
      }, 4000);
      return false;
    } if (subject === '') {
      const str = 'subject cannot be empty';
      openModal(str);
      setTimeout(() => {
        closeModal();
      }, 4000);
      return false;
    } if (message === '') {
      const str = 'Body of the email cannot be empty';
      openModal(str);
      setTimeout(() => {
        closeModal();
      }, 4000);
      return false;
    }
    return true;
  };
  const valid = validate();

  if (valid) {
    const data = {
      recieversEmail,
      subject,
      status,
      message,
    };
    const id = body.getAttribute('messageid');
    fetch(`${baseUrl}/api/v1/resend/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        closeResendForm();
        getSentMessages();
        openModal(res.data, 'SUCCESS', 'success');
      }).catch((e) => {
        openModal('An error must have occurred');
      });
  }
};

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
            if (sent.retract) {
              sentMsg.innerHTML += `
              <div class="main-flex message-list">
                <span class="col-3 flex" onclick="openMessage('sentMail'); getOnesentMessage(${sent.id})" >
                  <span class="col-1 arrow-cover flex"><i class="fas fa-arrow-circle-right arrow mr-25"></i>
                    <i class="fas fa-exclamation-triangle ml-25 danger-col" title="retracted Message"></i>
                  </span>
                  <span class="col-9 mail-head draft-t">To : ${sent.firstname} ${sent.lastname}</span>
                </span>
                <article class="col-7 mail-body" onclick="openMessage('sentMail'); getOnesentMessage(${sent.id})" >${sent.message} </article>
                <span class="col-2 flex justify-content-sb">
                  <span class="col-2 center-text start-text" title="delete" onclick="deleteSentMessage(${sent.id})" ><i class="fas fa-trash delete"></i></span>
                  <span class="col-2 center-text start-text retracted" title="ReSend Message" onclick="openResendForm(${sent.id})">
                    <i class="fas fa-share-square"></i>
                  </span>
                  <span class="col-6 center-text start-text">${formatDate(sent.createdon)}</span>
                </span>
              </div>
              `;
            } else {
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
                  <span class="col-2 center-text start-text" title="delete" onclick="deleteSentMessage(${sent.id})" ><i class="fas fa-trash delete"></i></span>
                  <span class="col-2 center-text start-text retract" title="Retract this Sent Message" onclick="retractMessage(${sent.id})" ><i class="fas fa-undo"></i></span>
                  <span class="col-6 center-text start-text">${formatDate(sent.createdon)}</span>
                </span>
              </div>
              `;
            }
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


const updateGroupName = () => {
  const updateField = document.querySelector('#edit-group-name');
  let name = updateField.value;
  const groupId = updateField.getAttribute('groupid');
  name = name.trim();
  if (name.length > 2) {
    const data = {
      name,
    };
    fetch(`${baseUrl}/api/v1/groups/${groupId}/name`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          showAllUserGroup();
        } else {
          openModal('Somethings not right maybe go left');
        }
      })
      .catch((err) => {
        openModal('An error must have occurred pls try again');
      });
  } else {
    openModal('group name filed cannot be empty and less that three characters');
  }
};

const editGroupName = (name, groupId) => {
  const editForm = document.querySelector('#edit-group-name-form');
  editForm.style.display = 'block';
  const field = document.querySelector('#edit-group-name');
  field.setAttribute('groupid', groupId);
  field.value = name;
};

const sendBulkMessage = (id) => {
  const head = document.querySelector('#bulk-header');
  const body = document.querySelector('#bulk-body');
  const message = document.querySelector('#bulk-message');
  const form = document.querySelector('#bulk-form');
  head.style.display = 'flex';
  body.style.display = 'block';
  message.style.display = 'block';
  form.setAttribute('groupid', id);
};

const closeBulkMessage = () => {
  const head = document.querySelector('#bulk-header');
  const body = document.querySelector('#bulk-body');
  const message = document.querySelector('#bulk-message');
  head.style.display = 'none';
  body.style.display = 'none';
  message.style.display = 'none';
};

const postMessage = () => {
  const form = document.querySelector('#bulk-form');
  const groupId = form.getAttribute('groupid');
  const subject = document.querySelector('#bulk-subject').value;
  const message = document.querySelector('#bulk-text-area').value;

  if (subject === '') {
    const str = 'subject cannot be empty';
    openModal(str);
    setTimeout(() => {
      closeModal();
    }, 4000);
    return;
  } if (message === '') {
    const str = 'Body of the email cannot be empty';
    openModal(str);
    setTimeout(() => {
      closeModal();
    }, 4000);
    return;
  }
  const data = {
    subject,
    message,
  };
  fetch(`${baseUrl}/api/v1/groups/${groupId}/messages`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        document.querySelector('#bulk-subject').value = '';
        document.querySelector('#bulk-text-area').value = '';
        const str = 'Messages has been posted';
        const head = 'SUCCESS';
        const type = 'success';

        getInboxMessages();
        getSentMessages();
        openModal(str, head, type);
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        const str = res.error;
        openModal(str);
        setTimeout(() => {
          closeModal();
        }, 4000);
      }
    }).catch((e) => {
      openModal('An Error must have occurred');
    });
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
        if (result.length) {
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
                    <button class="btn btn-sm" onclick="editGroupName('${resp.name}', ${resp.id})" >Edit</button>
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
        <div class="ind-contact" >
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
