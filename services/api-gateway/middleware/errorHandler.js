const errorHandler = (err, req, res, next) => {
  console.error(`[${req.requestId || 'no-id'}] Gateway error:`, err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(502).json({
    message: 'Bad Gateway: the target service is unavailable',
    requestId: req.requestId || null,
  });
};

module.exports = errorHandler;