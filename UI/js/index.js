/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */


const baseUrl = 'http://127.0.0.1:4000';

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
    });
};

const goBack = (from, to) => {
  const elm = document.querySelector(`.${from}`);
  elm.style.display = 'none';

  displayPanel(to);
};

const openDraft = () => {
  createContent();
  populate();
};

const populate = (flag = true) => {
  const receipient = document.getElementById('receipient');
  const subject = document.getElementById('subject');
  const textArea = document.getElementById('text-area');

  if (flag) {
    receipient.value = 'fromDraft@draft.com';
    subject.value = 'Being an amazing guy';
    textArea.value = `
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    Ab exercitationem dicta, illo dolorum quia
    ,asperiores distinctio voluptate iure eum labore debitis.
    Vero possimus doloribus laudantium illo soluta obcaecati tempore ipsam.
    `;
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
