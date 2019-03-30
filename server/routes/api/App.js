const Menu = require('../../models/Menu');
const UserSession = require('../../models/UserSession');
const UserRole = require('../../models/UserRole');
const User = require('../../models/User');


module.exports = (app) => {
  app.get('/api/app/menu', (req, res, next) => {
    Menu.find({
      isActive: true
    })
      .exec()
      .then((menus) => {
        menus = menus.sort((a, b) => {
          return a.index - b.index;
        });
        res.send({
          success: true,
          message: 'menu',
          menus: menus
        });
      })
      .catch((err) => next(err));
  });
  app.get('/api/app/logincheck', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    UserSession.find({
      _id: token
    })
      .exec()
      .then((usersession) => res.json(usersession))
      .catch((err) => next(err));
  });
  app.get('/api/app/userroles', (req, res, next) => {
    UserRole.find()
      .exec()
      .then((userroles) => res.send({
        success: true,
        message: 'userroles',
        userroles: userroles
      }))
      .catch((err) => next(err));
  });
}