const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const shoesRouter = require('./routes/shoesRoutes');
const cartRouter = require('./routes/cartRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const AppError = require('./utils/appError');
const { globalErrorHandler } = require('./controllers/errorController');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// console.log(path.join(__dirname, '../client/src/views'));

app.use(helmet());

//reading static file for front-end
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'client/src'));

app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org; report-uri /csp-report-endpoint"
//   );
//   next();
// });

app.use('/api/v1/shoes', shoesRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/', viewRouter);

// app.post('/csp-report-endpoint', (req, res) => {
//   console.log('CSP Violation:', req.body);
//   res.status(204).end(); // Ответ без содержимого (No Content)
// });

app.all('*', function (req, res, next) {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = { app };
