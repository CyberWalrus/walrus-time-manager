const Day = require('../../models/day');

module.exports = (app) => {
  app.get('/api/day', (req, res, next) => {
    Day.find()
      .exec()
      .then((day) => res.json(day))
      .catch((err) => next(err));
  });

  app.post('/api/day', function (req, res, next) {
    let day = new Day();
    const {body} = req;
    const {date} = body;
    day.date = date;
    day.timeStart = new Date(null).setHours(6);
    for (let i = 6; i < 30; i++) {
      day.times.push({time: new Date(null).setHours(i)});
    }
    day.save()
      .then(() => res.json(day))
      .catch((err) => next(err));
  });

  app.delete('/api/day/:id', function (req, res, next) {
    Day.findOneAndRemove({_id: req.params.id})
      .exec()
      .then((day) => res.json())
      .catch((err) => next(err));
  });

  app.post('/api/day/:id/changedate', (req, res, next) => {
    const {body} = req;
    const {date} = body;

    Day.findById(req.params.id)
      .exec()
      .then((day) => {
        day.date = date;

        day.save()
          .then(() => res.json(day))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }); // end of sign up endpoint
};