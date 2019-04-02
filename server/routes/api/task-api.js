const TaskList = require(`../../models/task-list-db`);
const Task = require(`../../models/task-db`);

module.exports = (app) => {

  app.get(`/api/tasklist`, (req, res, next) => {

    TaskList.find()
      .exec()
      .then((tasklist) => res.json(tasklist))
      .catch((err) => next(err));

  });

  app.post(`/api/tasklist`, function (req, res, next) {

    let tasklist = new TaskList();
    const {body} = req;
    const {name} = body;
    tasklist.name = name;

    tasklist.save()
      .then(() => res.json(tasklist))
      .catch((err) => next(err));

  });

  app.delete(`/api/tasklist/:id`, function (req, res, next) {

    TaskList.findOneAndRemove({"_id": req.params.id})
      .exec()
      .then((tasklist) => res.json())
      .catch((err) => next(err));

  });

  app.post(`/api/tasklist/:id/changename`, (req, res, next) => {

    const {body} = req;
    const {name} = body;

    TaskList.findById(req.params.id)
      .exec()
      .then((tasklist) => {

        tasklist.name = name;

        tasklist.save()
          .then(() => res.json(tasklist))
          .catch((err) => next(err));

      })
      .catch((err) => next(err));

  }); // end of sign up endpoint

  app.get(`/api/task`, (req, res, next) => {

    Task.find()
      .exec()
      .then((tasks) => res.json(tasks))
      .catch((err) => next(err));

  });
  app.get(`/api/task/:id`, function (req, res, next) {

    Task.findById(req.params.id)
      .exec()
      .then((task) => res.json(task))
      .catch((err) => next(err));

  });
  app.post(`/api/task`, function (req, res, next) {

    let task = new Task();
    const {body} = req;
    const {taskNew} = body;
    Object.assign(task, taskNew);
    task.save()
      .then(() => res.json(task))
      .catch((err) => next(err));

  });
  app.post(`/api/task/:id/change`, (req, res, next) => {

    const {body} = req;
    const {taskOld} = body;

    Task.findById(req.params.id)
      .exec()
      .then((task) => {

        Object.assign(task, taskOld);

        task.save()
          .then(() => res.json(task))
          .catch((err) => next(err));

      })
      .catch((err) => next(err));

  });

};
