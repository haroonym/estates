function errorHandler(err, req, res, next) {
  if (err) {
    console.log(`ERROR ===> ${err.message.red.inverse}`);
  } else next();
}

function notFoundHandler(req, res) {
  console.log(`Not Found ===> ${req.originalUrl}`.blue);
  res.status(404).json({
    code: 404,
    data: 'The requested route was not found',
  });
}

module.exports = { errorHandler, notFoundHandler };
