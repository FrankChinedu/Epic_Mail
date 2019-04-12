/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const baseUrl = 'http://127.0.0.1:4000';

const {
  accessToken, userFirstname, userLastname, userEmail,
} = localStorage;

const setToken = (res) => {
  window.localStorage.setItem('accessToken', res.data.token);
  window.localStorage.setItem('userEmail', res.data.email);
  window.localStorage.setItem('userFirstname', res.data.firstname);
  window.localStorage.setItem('userLastname', res.data.lastname);
};

const reDirectIfLoggedIn = () => {
  if (accessToken && userFirstname && userLastname && userEmail) {
    window.location.href = './inbox-page.html';
  }
};

reDirectIfLoggedIn();

const signIn = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const error = document.querySelector('#error');

  const data = { email, password };
  fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        setToken(res);
        window.location.href = './inbox-page.html';
      } else
      if (res.status === 400) {
        error.innerHTML = res.error;
      } else {
        error.innerHTML = 'something went wrong';
      }
    });
};

const signUp = () => {
  const email = document.querySelector('#email').value;
  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const password = document.querySelector('#password').value;
  const conPassword = document.querySelector('#con-password').value;
  const error = document.querySelector('#error');

  if (password !== conPassword) {
    error.innerHTML = 'Password must match confirm password';
    return;
  }

  const data = {
    email,
    password,
    firstname,
    lastname,
  };
  fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        setToken(res);
        window.location.href = './inbox-page.html';
      } else
      if (res.status === 401) {
        error.innerHTML = res.error;
      } else {
        error.innerHTML = 'something went wrong';
      }
    }).catch((err) => {
      error.innerHTML = 'something went wrong';
    });
};
