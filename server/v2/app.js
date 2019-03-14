import routes from './routes/api';

const apiURL = '/api/v2';
global.apiURL = apiURL;

export default (app) => {
  Object.keys(routes).forEach((key) => {
    const value = routes[key];
    app.use(`${apiURL}/`, value);
  });
};
