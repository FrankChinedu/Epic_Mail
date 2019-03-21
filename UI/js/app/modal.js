/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const openModal = (body, head = 'ERROR', type = 'error') => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  const header = document.querySelector('#modal-header');
  const bod = document.querySelector('#modal-body');
  header.classList.add(type);
  bod.classList.add(type);
  header.innerHTML = head;
  bod.innerHTML = body;
};

const closeModal = () => {
  const header = document.querySelector('#modal-header');
  const bod = document.querySelector('#modal-body');
  header.innerHTML = '';
  bod.innerHTML = '';
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
};


const close = document.querySelector('#close');
close.onclick = () => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
};


window.onclick = (event) => {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
