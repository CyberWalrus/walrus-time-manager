const Message = require('../../models/Message');
const MessageBoard = require('../../models/MessageBoard');
const MessageList = require('../../models/MessageList');

module.exports = (app) => {
  app.get('/api/messageboards', (req, res, next) => {
    MessageBoard.find()
      .exec()
      .then((messageboard) => res.json(messageboard))
      .catch((err) => next(err));
  });

  app.post('/api/messageboards/add', function (req, res, next) {
    let messageboard = new Message();
    const {body} = req;
    const {value} = body;
    messageboard.value = value;

    messageboard.save()
      .then(() => res.json(messageboard))
      .catch((err) => next(err));
  });

  app.get('/api/messagelists', (req, res, next) => {
    MessageList.find()
      .exec()
      .then((messagelist) => res.json(messagelist))
      .catch((err) => next(err));
  });

  app.post('/api/messagelists/add', function (req, res, next) {
    let messagelist = new MessageList();
    const {body} = req;
    const {value} = body;
    messagelist.value = value;

    messagelist.save()
      .then(() => res.json(messagelist))
      .catch((err) => next(err));
  });
  app.get('/api/messages/:id', (req, res, next) => {
    Message.find({
      messageList: req.params.id
    })
      .exec()
      .then((message) => res.json(message))
      .catch((err) => next(err));
  });

  app.post('/api/messages/:id/add', function (req, res, next) {
    let message = new Message();
    const {body} = req;
    const {value} = body;
    message.value = value;

    message.save()
      .then(() => res.json(message))
      .catch((err) => next(err));
  });
};
