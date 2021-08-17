const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/card-demo-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((e) => {
    console.log({
        error: 'No connection',
        message: e.message
    });
  });