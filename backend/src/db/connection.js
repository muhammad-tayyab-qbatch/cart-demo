const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/card-demo-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database Connection successful');
  })
  .catch((e) => {
    console.log({
        error: 'No connection',
        message: e.message
    });
  });
