/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */


const {
  accessToken, userFirstname, userLastname, userEmail,
} = localStorage;

const isAuthenticated = () => {
  if (accessToken === undefined
     && userFirstname === undefined
     && userLastname === undefined && userEmail === undefined) {
    window.location.href = './signin.html';
  }
};
isAuthenticated();


const logout = () => {
  unSetToken();
  isAuthenticated();
  window.location.href = './signin.html';
};

const unSetToken = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('userEmail');
  window.localStorage.removeItem('userFirstname');
  window.localStorage.removeItem('userLastname');
};
