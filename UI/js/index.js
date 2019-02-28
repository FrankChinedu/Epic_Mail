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