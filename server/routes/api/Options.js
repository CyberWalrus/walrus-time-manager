const Menu = require('../../models/Menu');
const User = require('../../models/User');
const UserRole = require('../../models/UserRole');
const {findLastValue, takeMasiv} = require('../../utils/FindFunctions')

module.exports = (app) => {

  // MENU
  app.get('/api/options/menu', (req, res, next) => {
    Menu.find()
      .exec()
      .then((menu) => res.json(menu))
      .catch((err) => next(err));
  });

  app.post('/api/options/menu/create', (req, res, next) => {
    let menu = new Menu();
    const {body} = req;
    const {label, url, idx, userRole} = body;
    menu.label = label;
    menu.url = url;
    menu.index = idx;
    menu.userRole = userRole;

    menu.save()
      .then(() => res.json(menu))
      .catch((err) => next(err));
  });

  app.post('/api/options/menu/:id/change', (req, res, next) => {
    const {body} = req;
    const {label, url, idx, userRole} = body;
    let index = idx;
    Menu.find().exec(function (err, books) {
      if (err) throw err;
      index = findLastValue(books, idx, 0, 'index');
      console.log(index);
    });
    console.log(index);
    Menu.findById(req.params.id)
      .exec()
      .then((menu) => {
        menu.label = label;
        menu.url = url;
        menu.index = index;
        menu.userRole = userRole;

        menu.save()
          .then(() => res.json(menu))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/options/menu/:id/isdeleted', (req, res, next) => {
    Menu.findById(req.params.id)
      .exec()
      .then((menu) => {
        menu.isDeleted = !(menu.isDeleted);

        menu.save()
          .then(() => res.json(menu))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.delete('/api/options/menu/:id/deleted', function (req, res, next) {
    Menu.findOneAndRemove({_id: req.params.id})
      .exec()
      .then((menu) => res.json())
      .catch((err) => next(err));
  });

  app.get('/api/options/userrole', (req, res, next) => {
    UserRole.find()
      .exec()
      .then((menu) => res.json(menu))
      .catch((err) => next(err));
  });


  // USER
  app.get('/api/options/user', (req, res, next) => {
    User.find()
      .exec()
      .then((user) => res.json(user))
      .catch((err) => next(err));
  });

  app.post('/api/options/user/create', (req, res, next) => {
    let user = new Menu();
    const {body} = req;
    const {label, url, idx, userRoleId} = body;
    user.label = label;
    user.url = url;
    user.index = idx;
    user.userRoleId = userRoleId;

    user.save()
      .then(() => res.json(user))
      .catch((err) => next(err));
  });

  app.post('/api/options/user/:id/change', (req, res, next) => {
    const {body} = req;
    const {login, userRole} = body;

    User.findById(req.params.id)
      .exec()
      .then((user) => {
        user.login = login;
        user.userRole = userRole;

        user.save()
          .then(() => res.json(user))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/options/menu/:id/isdeleted', (req, res, next) => {
    User.findById(req.params.id)
      .exec()
      .then((user) => {
        user.isDeleted = !(menu.isDeleted);

        user.save()
          .then(() => res.json(user))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.delete('/api/options/user/:id/deleted', function (req, res, next) {
    User.findOneAndRemove({_id: req.params.id})
      .exec()
      .then((user) => res.json())
      .catch((err) => next(err));
  });

  //USER ROLE

  app.get('/api/options/userrole', (req, res, next) => {
    UserRole.find()
      .exec()
      .then((userrole) => res.json(userrole))
      .catch((err) => next(err));
  });

  app.post('/api/options/userrole/create', (req, res, next) => {
    let userrole = new UserRole();
    const {body} = req;
    const {name} = body;
    userrole.name = name;

    userrole.save()
      .then(() => res.json(userrole))
      .catch((err) => next(err));
  });

  app.post('/api/options/userrole/:id/change', (req, res, next) => {
    const {body} = req;
    const {name} = body;

    UserRole.findById(req.params.id)
      .exec()
      .then((userrole) => {
        userrole.name = name;

        userrole.save()
          .then(() => res.json(userrole))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/options/userrole/:id/isdeleted', (req, res, next) => {
    UserRole.findById(req.params.id)
      .exec()
      .then((userrole) => {
        userrole.isDeleted = !(userrole.isDeleted);

        userrole.save()
          .then(() => res.json(userrole))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.delete('/api/options/userrole/:id/deleted', function (req, res, next) {
    UserRole.findOneAndRemove({_id: req.params.id})
      .exec()
      .then((userrole) => res.json())
      .catch((err) => next(err));
  });
}
