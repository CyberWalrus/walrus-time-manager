
const User = require(`../../models/user-db`);
const UserSession = require(`../../models/user-session-db`);
const Counter = require(`../../models/counter-db`);

module.exports = (app) => {

  app.get(`/api/users`, (req, res, next) => {

    User.find()
      .exec()
      .then((user) => res.json(user))
      .catch((err) => next(err));

  });
  app.post(`/api/useradd`, function (req, res, next) {

    let user = new User();
    const {body} = req;
    let {login,
      password,
      passwordre,
      email,
      firstName,
      lastName} = body;

    if (!login) {

      return res.send({
        "success": false,
        "message": `Error: Login cannot be blank.`
      });

    }
    if (!password) {

      return res.send({
        "success": false,
        "message": `Error: Password cannot be blank.`
      });

    }
    if (!email) {

      return res.send({
        "success": false,
        "message": `Error: Email cannot be blank.`
      });

    }
    if (password != passwordre) {

      return res.send({
        "success": false,
        "message": `Error: Password cannot be blank.`
      });

    }
    email = email.toLowerCase();
    email = email.trim();
    login = login.toLowerCase();
    login = login.trim();
    User.find({
      "email": email,
      "login": login
    }, (err, previousUsers) => {

      if (err) {

        return res.send({
          "success": false,
          "message": `Error: Server error`
        });

      } else if (previousUsers.length > 0) {

        return res.send({
          "success": false,
          "message": `Error: Account already exist.`
        });

      }
      // Save the new user
      const user = new User();
      user.login = login;
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.save()
        .then(() => res.json(user))
        .catch((err) => next(err));

    });

  });

  app.post(`/api/account/test`, (req, res, next) => {

    let message = `test`;
    res.json(message);

  });
  /*
  * Sign up
  */
  app.post(`/api/account/signup`, (req, res, next) => {

    const {body} = req;
    let {
      login,
      email,
      password,
      firstName,
      lastName
    } = body;

    if (!email) {

      return res.send({
        "success": false,
        "message": `Error: Email cannot be blank.`
      });

    }
    if (!login) {

      return res.send({
        "success": false,
        "message": `Error: Login cannot be blank.`
      });

    }
    if (!firstName) {

      return res.send({
        "success": false,
        "message": `Error: First Name cannot be blank.`
      });

    }
    if (!lastName) {

      return res.send({
        "success": false,
        "message": `Error: Last Name cannot be blank.`
      });

    }
    if (!password) {

      return res.send({
        "success": false,
        "message": `Error: Password cannot be blank.`
      });

    }
    email = email.toLowerCase();
    email = email.trim();
    let loginSign = login.toLowerCase();
    loginSign = loginSign.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      "email": email
    }, (err, previousUsers) => {

      if (err) {

        return res.send({
          "success": false,
          "message": `Error: Server error`
        });

      } else if (previousUsers.length > 0) {

        return res.send({
          "success": false,
          "message": `Error: Account already exist.`
        });

      }
      // Save the new user
      const newUser = new User();
      newUser.login = login;
      newUser.loginSign = loginSign;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.save((err, user) => {

        if (err) {

          return res.send({
            "success": false,
            "message": `Error: Server error`
          });

        }
        return res.send({
          "success": true,
          "message": `Signed up`
        });

      });

    });

  }); // end of sign up endpoint

  app.post(`/api/account/signin`, (req, res, next) => {

    const {body} = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {

      return res.send({
        "success": false,
        "message": `Error: Email cannot be blank.`
      });

    }
    if (!password) {

      return res.send({
        "success": false,
        "message": `Error: Password cannot be blank.`
      });

    }
    email = email.toLowerCase();
    email = email.trim();
    User.find({
      "email": email
    }, (err, users) => {

      if (err) {

        console.log(`err 2:`, err);
        return res.send({
          "success": false,
          "message": `Error: server error`
        });

      }
      if (users.length != 1) {

        return res.send({
          "success": false,
          "message": `Error: Invalid`
        });

      }
      const user = users[0];
      if (!user.validPassword(password)) {

        return res.send({
          "success": false,
          "message": `Error: Invalid`
        });

      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.userRole = user.userRole;
      userSession.userLogin = user.email;
      userSession.save((err, doc) => {

        if (err) {

          console.log(err);
          return res.send({
            "success": false,
            "message": `Error: server error`
          });

        }
        return res.send({
          "success": true,
          "message": `Valid sign in`,
          "token": doc._id
        });

      });

    });

  });

  app.get(`/api/account/logout`, (req, res, next) => {

    // Get the token
    const {query} = req;
    const {token} = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      "_id": token,
      "isActive": true
    }, {
        "$set": {
          "isActive": false
        }
      }, null, (err, sessions) => {

        if (err) {

          console.log(err);
          return res.send({
            "success": false,
            "message": `Error: Server error`
          });

        }
        return res.send({
          "success": true,
          "message": `Good`
        });

      });

  });

  app.get(`/api/account/verify`, (req, res, next) => {

    // Get the token
    const {query} = req;
    const {token} = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      "_id": token,
      "isActive": true
    }, (err, sessions) => {

      if (err) {

        console.log(err);
        return res.send({
          "success": false,
          "message": `Error: Server error`
        });

      }
      if (sessions.length != 1) {

        return res.send({
          "success": false,
          "message": `Error: Invalid`
        });

      } else {

        // DO ACTION
        return res.send({
          "success": true,
          "message": `Good`
        });

      }

    });

  });

};
