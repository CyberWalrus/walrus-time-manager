const CaseList = require('../../models/case-list');
const Case = require(`../../models/case`)

module.exports = (app) => {
  app.get('/api/caselist', (req, res, next) => {
    CaseList.find()
      .exec()
      .then((caselist) => res.json(caselist))
      .catch((err) => next(err));
  });

  app.post('/api/caselist', function (req, res, next) {
    let caselist = new CaseList();
    const {body} = req;
    const {name} = body;
    caselist.name = name;

    caselist.save()
      .then(() => res.json(caselist))
      .catch((err) => next(err));
  });

  app.delete('/api/caselist/:id', function (req, res, next) {
    CaseList.findOneAndRemove({_id: req.params.id})
      .exec()
      .then((caselist) => res.json())
      .catch((err) => next(err));
  });

  app.post('/api/caselist/:id/changename', (req, res, next) => {
    const {body} = req;
    const {name} = body;

    CaseList.findById(req.params.id)
      .exec()
      .then((caselist) => {
        caselist.name = name;

        caselist.save()
          .then(() => res.json(caselist))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }); // end of sign up endpoint
  
  app.get('/api/case/:id', function (req, res, next) {
    Case.findById(req.params.id)
    .exec()
    .then((caseN) => res.json(caseN))
    .catch((err) => next(err));
  });
  app.post('/api/case/:id/change', (req, res, next) => {
    const {body} = req;
    const {caseOld} = body;

    Case.findById(req.params.id)
      .exec()
      .then((caseN) => {
        Object.assign(caseN, caseOld);

        caseN.save()
          .then(() => res.json(caseN))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }); 
};