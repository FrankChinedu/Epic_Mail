let profilePanel = document.getElementById("profile-panel");

profilePanel.addEventListener("click", () => {
  let arrow = document.getElementById("drop-down");
  let profileSection = document.getElementById("profile-section");
  let height = "fit-content";

  if (profileSection.style.height == height) {
    profileSection.style.height = '0px'
    arrow.innerHTML = '&#9650;';
  }else{
    profileSection.style.height = height;
    arrow.innerHTML = '&#9660;';
  }
});

const displayPanel = (id) => {
  const idName = `${id}-message`;
  const allMessageDisplay = document.querySelectorAll(".displayForJs");
  allMessageDisplay.forEach(node => {
    node.style.display = 'none';
  });

  const allListDisplay = document.querySelectorAll(".listForJs");
  
  allListDisplay.forEach(node => {
    node.classList.remove("inbox-active");
  });

  const newListItem = document.getElementById(id);
  newListItem.classList.add("inbox-active");

  const newElm = document.getElementById(idName);
  newElm.style.display = 'block';

}

const createContent = (flag = false) => {
  populate(false);
  const emailMainBody = document.querySelector(".email-main-body");
  const emailBody = document.querySelector(".email-body");
  const emailHead = document.querySelector(".email-header");
  // const mobileCreateBtn = document.querySelector("#mobile-create");
  const value = 'none';

  if (emailMainBody.style.display === value) {
    emailMainBody.style.display = "block";
    emailBody.style.display = "block";
    emailHead.style.display = "flex";
  } else {
    emailBody.style.display = value;   
    emailMainBody.style.display = value;
    emailHead.style.display = value;
  }
}

const switchContact = (Name) => {
  const contactPanel = document.querySelectorAll(".contactJs");
  const className = document.querySelector(`.${Name}`);
  const currentActive = document.querySelector(".contact-head-active");
  const idName = document.querySelector(`#${Name}`);
  contactPanel.forEach(node => {
    node.style.display = "none";
  });

  className.style.display = 'flex';
  currentActive.classList.remove("contact-head-active");
  idName.classList.add("contact-head-active");
}

const openAddForm = () => {
  const currentActive = document.querySelector(".contact-head-active");
  closeAddPanel();
  const idName = `${currentActive.id}-1`;
  const className = document.querySelector(`.${idName}`);
  className.style.display = 'block'
}

const closeAddPanel = () => {
  const addForms = document.querySelectorAll(".formAddContactJs");
  addForms.forEach(node => {
    node.style.display = "none";
  });
}

const openMessage = (panel) => {
  const allMessageDisplay = document.querySelectorAll(".displayForJs");
  allMessageDisplay.forEach(node => {
    node.style.display = "none";
  });

  const elm = document.querySelector(`.${panel}`);
  elm.style.display  = 'block';
}

const goBack = (from, to) => {

  const elm = document.querySelector(`.${from}`);
  elm.style.display = 'none';

  displayPanel(to)
}

const openDraft = () => {
  createContent();
  populate();
}

const populate = (flag = true) => {
  const receipient = document.getElementById("receipient");
  const subject = document.getElementById("subject");
  const textArea = document.getElementById("text-area");

  if (flag) {
    receipient.value = "fromDraft@draft.com";
    subject.value = "Being an amazing guy";
    textArea.value = `
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    Ab exercitationem dicta, illo dolorum quia
    ,asperiores distinctio voluptate iure eum labore debitis.
    Vero possimus doloribus laudantium illo soluta obcaecati tempore ipsam.
    `;
  }else {
    receipient.value = '';
    subject.value = '';
    textArea.value = ''
  }

}

const listMember = () => {
  const groupName = document.querySelectorAll(".group-name");
  groupName.forEach(node => {
    node.style.display = "none";
  });

  const groupMembers = document.querySelector(".group-members");
  groupMembers.style.display = 'block';
}

const backToList = () => {
  const groupName = document.querySelectorAll(".group-name");
  groupName.forEach(node => {
    node.style.display = "block";
  });

  const groupMembers = document.querySelector(".group-members");
  groupMembers.style.display = "none";
}