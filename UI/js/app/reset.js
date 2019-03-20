/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */


const unSetToken = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('userEmail');
  window.localStorage.removeItem('userFirstname');
  window.localStorage.removeItem('userLastname');
};
unSetToken();

const baseUrl = 'http://127.0.0.1:4000';
// const baseUrl = 'https://epic-mail-ocf.herokuapp.com';

const resetPassword = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('x-access-token');
  const password = document.querySelector('#password').value;
  const conPassword = document.querySelector('#con-password').value;
  const error = document.querySelector('#error');
  const success = document.querySelector('#success');

  if (token && token.length > 0) {
    if (password.length < 8) {
      error.innerHTML = 'Password must be greater than 8';
      return;
    }
    if (password !== conPassword) {
      error.innerHTML = 'Password and confirm password does not match';
      return;
    }
    const data = {
      password,
    };

    fetch(`${baseUrl}/api/v1/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          // error.innerHTML = '';
          success.innerHTML = res.data;
          setTimeout(() => {
            success.innerHTML = `${res.data} Redirecting...`;
            setTimeout(() => {
              window.location.href = './inbox-page.html';
            }, 3000);
          }, 1000);
        } else if (res.status === 400) {
          success.innerHTML = '';
          error.innerHTML = res.error;
        } else if (res.status === 404) {
          success.innerHTML = '';
          error.innerHTML = res.error;
        } else {
          success.innerHTML = '';
          error.innerHTML = 'something went wrong';
        }
      });
  } else {
    error.innerHTML = 'Something is not Right';
  }
};

const forgotPassword = () => {
  let email = document.querySelector('#email').value;
  const error = document.querySelector('#error');
  const success = document.querySelector('#success');
  email = email.trim();

  if (email) {
    const data = {
      email,
    };

    fetch(`${baseUrl}/api/v1/auth/reset`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          error.innerHTML = '';
          success.innerHTML = ` ${res.data.message} for ${res.data.email} `;
        } else if (res.status === 404) {
          success.innerHTML = '';
          error.innerHTML = res.data.message;
        } else {
          success.innerHTML = '';
          error.innerHTML = 'something went wrong';
        }
      });
  } else {
    success.innerHTML = '';
    error.innerHTML = 'Something is not Right';
  }
};
