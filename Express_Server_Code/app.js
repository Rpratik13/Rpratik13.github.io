// const config  = require('./configs');
// const express = require('express');
// const app     = express();

// app.get('/help', function(req, res) {
//   res.json({
//     from    : 'Help',
//     message : 'Welcome to Express',
//   });
// });

// app.use(function(req, res, next) {
//   // res.json({
//   //   message : 'Blocked at middleware',
//   // });
//   next();
// });

// app.use(function(req, res, next) {
//   res.json({
//     message : 'Blocked at 2nd Middleware',
//   });
// });

// app.get('/home', function(req, res) {
//   res.json({
//     from    : 'Home',
//     message : 'Welcome to Express',
//   });
// });

// app.get('/home/:abc', function(req, res) {
//   res.json({
//     from    : 'Home',
//     params  : req.params,
//     queries : req.query,
//   });
// });

// app.listen(config.port, function() {
//   console.log(`Server Listening at Port ${config.port}`);
// });

// // Middleware
// // function (req, res, next) {
//   // req is http request object
//   // res is http response object
//   // next is next middleware function reference
// // }

// // Types of Middleware
// // Application Level
// // Routing Level
// // Inbuilt
// // Thirdparty
// // Error Handling

// // configuration block
