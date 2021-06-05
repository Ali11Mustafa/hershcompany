const mongoose = require('mongoose');
const dotenv = require('dotenv');

// dabe la pesh const app betn // bas la bo servery aw coda pewista la filakani trish datwani rastaw xo process.env.anything bakar bene.
dotenv.config({
  path: './config.env'
});

const app = require('./app');

//.connect(process.env.DATABASE_LOCAL, {
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000; // no internet
app.listen(port, () => {
  console.log(`App runinig on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
