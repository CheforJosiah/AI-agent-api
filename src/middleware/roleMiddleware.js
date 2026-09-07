export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session || !allowedRoles.includes(req.session.role)) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      return next(err);
    }
    next();
  };
};