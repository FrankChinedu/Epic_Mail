/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const modal = document.createElement('script');
modal.src = './js/app/modal.js';
document.head.appendChild(modal);

// const token = window.localStorage.getItem('accessToken');

const sendMessage = () => {
  let recieversEmail = document.querySelector('#receipient').value;
  const subject = document.querySelector('#subject').value;
  const message = document.querySelector('#text-area').value;
  const status = 'sent';
  recieversEmail = recieversEmail.trim();

  // copied https://www.w3resource.com/javascript/form/email-validation.php
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
    fetch(`${baseUrl}/api/v1/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((res) => {
        if (res.status === 201) {
          document.querySelector('#receipient').value = '';
          document.querySelector('#subject').value = '';
          document.querySelector('#text-area').value = '';
          const str = res.message;
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
        // window.location.href = './inbox-page.html';
      }).catch(() => {
      });
  }
};

const saveDraft = () => {
  closeModal();
};
