const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { app } = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Unhandler exception. Shutting down! Not promise!');
  console.log(err.message, err.stack);
  process.exit(1);
});

const urlConnection = process.env.MONGO_CONNECTION.replace(
  '<USERNAME>',
  process.env.MONGO_USER
).replace('<PASSWORD>', process.env.MONGO_PASS);

(async () => {
  await mongoose.connect(urlConnection);
  console.log('Database connected');
})();

const server = app.listen(process.env.PORT, () => {
  console.log('Server has been started...');
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandler rejection. Shutting down!');
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
