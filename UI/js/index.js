/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */


const baseUrl = 'https://epic-mail-ocf.herokuapp.com';

const profilePanel = document.getElementById('profile-panel');

if (profilePanel) {
  profilePanel.addEventListener('click', () => {
    const arrow = document.getElementById('drop-down');
    const profileSection = document.getElementById('profile-section');
    const height = 'fit-content';

    if (profileSection.style.height === height) {
      profileSection.style.height = '0px';
      arrow.innerHTML = '&#9650;';
    } else {
      profileSection.style.height = height;
      arrow.innerHTML = '&#9660;';
    }
  });
}

const displayPanel = (id) => {
  const idName = `${id}-message`;
  const allMessageDisplay = document.querySelectorAll('.displayForJs');
  allMessageDisplay.forEach((node) => {
    node.style.display = 'none';
  });

  const allListDisplay = document.querySelectorAll('.listForJs');
  allListDisplay.forEach((node) => {
    node.classList.remove('inbox-active');
  });

  const newListItem = document.getElementById(id);
  newListItem.classList.add('inbox-active');

  const newElm = document.getElementById(idName);
  newElm.style.display = 'block';
};

const createContent = () => {
  populate(false);
  closeBulkMessage();
  closeDraft();
  const emailMainBody = document.querySelector('.email-main-body');
  const emailBody = document.querySelector('.email-body');
  const emailHead = document.querySelector('.email-header');
  // const mobileCreateBtn = document.querySelector('#mobile-create');
  const value = 'none';

  if (emailMainBody.style.display === value) {
    emailMainBody.style.display = 'block';
    emailBody.style.display = 'block';
    emailHead.style.display = 'flex';
  } else {
    emailBody.style.display = value;
    emailMainBody.style.display = value;
    emailHead.style.display = value;
  }
};

const switchContact = (Name) => {
  const contactPanel = document.querySelectorAll('.contactJs');
  const className = document.querySelector(`.${Name}`);
  const currentActive = document.querySelector('.contact-head-active');
  const idName = document.querySelector(`#${Name}`);
  contactPanel.forEach((node) => {
    node.style.display = 'none';
  });

  className.style.display = 'flex';
  currentActive.classList.remove('contact-head-active');
  idName.classList.add('contact-head-active');
};

const openAddForm = () => {
  const currentActive = document.querySelector('.contact-head-active');
  closeAddPanel();
  const idName = `${currentActive.id}-1`;
  const className = document.querySelector(`.${idName}`);
  className.style.display = 'block';
};

const closeAddPanel = () => {
  const addForms = document.querySelectorAll('.formAddContactJs');
  addForms.forEach((node) => {
    node.style.display = 'none';
  });
};

const openMessage = (panel) => {
  const allMessageDisplay = document.querySelectorAll('.displayForJs');
  allMessageDisplay.forEach((node) => {
    node.style.display = 'none';
  });

  const elm = document.querySelector(`.${panel}`);
  elm.style.display = 'block';
};

const getOnesentMessage = (num) => {
  const display = document.querySelector('#sent-display');
  fetch(`${baseUrl}/api/v1/messages/sent/${num}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const sent = res.data;
        display.innerHTML = `
        <div>
          <span class="go-back" onclick="goBack('sentMail', 'sent')"><i class="fas fa-arrow-left"></i></span>
          <span class="tag mr-25">
            <i class="fas fa-plane-departure mr-5 dark-col"></i>Sent
          </span>
          <span class="tag cursor" title="Retract this message">
            <i class="fas fa-undo danger-col"></i>Retract
          </span>
        </div>
        <div class="read-mailContent">
          <div class="flex">
            <h2>${sent.subject}</h2> <span></span>
          </div>
          <div>
            <div class="flex">
              <span>To: &nbsp; </span>
              <b>${sent.firstname} ${sent.lastname}</b>
            </div>
            <div class="flex">
                <span>From: &nbsp; </span>
                <b>me</b>
            </div>
          </div>

          <div class="mailContent">
          ${sent.message}
          </div>
          <div class="mt-25">
            <button class="btn btn-sm btn-default">Reply</button>
          </div>
        </div>
        `;
      }
    }).catch((e) => {
      display.innerHTML = `
      <div class="main-flex message-list">
        <article class="col-10 mail-body center-text">
          An Error or something must have occured try reloading this page.
        </article>
      </div>
      `;
    });
};

const getOneInboxMessage = (num) => {
  const display = document.querySelector('#inbox-display');
  fetch(`${baseUrl}/api/v1/messages/${num}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        const inbox = res.data;
        display.innerHTML = `
        <div>
          <span class="go-back" onclick="goBack('readMail', 'inbox')"><i class="fas fa-arrow-left"></i></span>
          <span class="tag">
            <i class="fas fa-inbox mr-5 dark-col"></i>Inbox
          </span>
        </div>
        <div class="read-mailContent">
          <div class="flex">
            <h2>${inbox.subject}</h2> <span></span>
          </div>
          <div>
            <div class="flex">
              <span>From: &nbsp; </span>
              <b>${inbox.email}</b>
            </div>
            <div class="flex">
                <span>To: &nbsp; </span>
                <b>me</b>
            </div>
          </div>
          <div class="mailContent">
            ${inbox.message}
          </div>

          <div class="mt-25">
            <button class="btn btn-sm btn-default">Reply</button>
          </div>
        </div>
        `;
      }
    }).catch((e) => {
      display.innerHTML = `
      <div class="main-flex message-list">
        <article class="col-10 mail-body center-text">
          An Error or something must have occured try reloading this page.
        </article>
      </div>
      `;
    });
};

const goBack = (from, to) => {
  const elm = document.querySelector(`.${from}`);
  elm.style.display = 'none';

  displayPanel(to);
};

const openDraft = (id) => {
  let show = document.querySelector('#draft-display');
  show = show.style.display;
  if (show === 'none') {
    fetch(`${baseUrl}/api/v1/messages/draft/${id}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        const { subject } = res.data;
        const { message } = res.data;
        let { email } = res.data;
        if (!email) {
          email = '';
        }
        const data = {
          subject,
          message,
          email,
        };
        createContentFromDraft();
        populate(true, data);
      })
      .catch((err) => {
        openModal('An Error must have occurred');
      });
  } else {
    createContentFromDraft();
  }
};

const closeDraft = () => {
  const draftBody = document.querySelector('#draft-body');
  const draftdisplay = document.querySelector('#draft-display');
  const draftHead = document.querySelector('#draft-head');
  const value = 'none';

  draftdisplay.style.display = value;
  draftBody.style.display = value;
  draftHead.style.display = value;
};

const createContentFromDraft = () => {
  closeBulkMessage();
  const draftBody = document.querySelector('#draft-body');
  const draftdisplay = document.querySelector('#draft-display');
  const draftHead = document.querySelector('#draft-head');
  // const mobileCreateBtn = document.querySelector('#mobile-create');
  const value = 'none';

  if (draftBody.style.display === value) {
    draftBody.style.display = 'block';
    draftdisplay.style.display = 'block';
    draftHead.style.display = 'flex';
  } else {
    draftdisplay.style.display = value;
    draftBody.style.display = value;
    draftHead.style.display = value;
  }
};


const populate = (flag = true, data = {}) => {
  const receipient = document.getElementById('draft-receipient');
  const subject = document.getElementById('draft-subject');
  const textArea = document.getElementById('draft-text-area');

  if (flag) {
    receipient.value = data.email;
    subject.value = data.subject;
    textArea.value = data.message;
  } else {
    receipient.value = '';
    subject.value = '';
    textArea.value = '';
  }
};

const listMember = () => {
  const groupName = document.querySelectorAll('.group-name');
  groupName.forEach((node) => {
    node.style.display = 'none';
  });

  const groupMembers = document.querySelector('.group-members');
  groupMembers.style.display = 'block';
};

const backToList = () => {
  const groupName = document.querySelectorAll('.group-name');
  groupName.forEach((node) => {
    node.style.display = 'block';
  });

  const groupMembers = document.querySelector('.group-members');
  groupMembers.style.display = 'none';
};

const submitForm = () => {
  location.href = './inbox-page.html';
};
