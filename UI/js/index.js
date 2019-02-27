let profile_panel = document.getElementById("profile-panel");

profile_panel.addEventListener("click", function() {
  let arrow = document.getElementById("drop-down");
  let profile_section = document.getElementById("profile-section");
  let height = "fit-content";

  if (profile_section.style.height == height) {
    profile_section.style.height = '0px'
    arrow.innerHTML = '&#9650;';
  }else{
    profile_section.style.height = height;
    arrow.innerHTML = '&#9660;';
  }
});