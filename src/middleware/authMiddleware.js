export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;
    return next(err);
  }
  next();
};