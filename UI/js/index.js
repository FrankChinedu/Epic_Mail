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
