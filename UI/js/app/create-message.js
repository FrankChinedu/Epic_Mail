/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const modal = document.createElement('script');
modal.src = './js/app/modal.js';
document.head.appendChild(modal);
const baseUrl = 'http://127.0.0.1:4000';

const token = window.localStorage.getItem('accessToken');

const sendMessage = () => {
  let email = document.querySelector('#receipient').value;
  const subject = document.querySelector('#subject').value;
  const message = document.querySelector('#text-area').value;
  const status = 'sent';
  email = email.trim();

  // copied https://www.w3resource.com/javascript/form/email-validation.php
  const validate = () => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === '' || !re.test(email)) {
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
  const valid = validate(email);

  if (valid) {
    const data = {
      email,
      subject,
      status,
      message,
    };
    fetch(`${baseUrl}/api/v1/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        console.log(res);
        // if (res.status === 200)
        // window.location.href = './inbox-page.html';
      });
  }
};

const saveDraft = () => {
  // console.log('close');
  closeModal();
};
