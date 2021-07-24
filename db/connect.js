const mongoose = require('mongoose')

const db = (uri) =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('succesfully connected to db'))
    .catch((err) => console.log(err))

module.exports = db
