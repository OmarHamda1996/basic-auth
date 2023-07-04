const express = require('express');
const app = express();
const router = require('./auth/router');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  },
};
