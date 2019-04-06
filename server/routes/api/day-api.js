const Day = require(`../../models/day-db`);

module.exports = app => {
  app.get(`/api/day`, (req, res, next) => {
    Day.find()
      .exec()
      .then(day => res.json(day))
      .catch(err => next(err));
  });

  app.post(`/api/day`, function(req, res, next) {
    let day = new Day();
    const { body } = req;
    const { date } = body;
    day.date = date;
    day.timeStart = 3600000 * 5;
    for (let i = 6; i < 30; i++) {
      day.times.push({
        timeStart: 3600000 * i,
        duration: 3600000
      });
    }
    day
      .save()
      .then(() => res.json(day))
      .catch(err => next(err));
  });

  app.delete(`/api/day/:id`, function(req, res, next) {
    Day.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(day => res.json())
      .catch(err => next(err));
  });

  app.post(`/api/day/:id/changedate`, (req, res, next) => {
    const { body } = req;
    const { date } = body;

    Day.findById(req.params.id)
      .exec()
      .then(day => {
        day.date = date;

        day
          .save()
          .then(() => res.json(day))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  app.post(`/api/day/:id/change-time`, (req, res, next) => {
    const { body } = req;
    const { timesNew } = body;

    Day.findById(req.params.id)
      .exec()
      .then(day => {
        day.times = timesNew;

        day
          .save()
          .then(() => res.json(day))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  app.post(`/api/day/:id/change-time/:timeid`, (req, res, next) => {
    const { body } = req;
    const { timeNew } = body;

    Day.findById(req.params.id)
      .exec()
      .then(day => {
        try {
          let timeIndex = null;
          day.times.find((element, index, array) => {
            return (timeIndex = element._id == timeNew._id ? index : timeIndex);
          });
          Object.assign(day.times[timeIndex], timeNew);
        } catch (err) {
          console.log(err);
        }

        day
          .save()
          .then(() => res.json(day))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });
};
