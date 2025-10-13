// Placeholder auth middleware - for future API key / JWT checks
module.exports = function requireAuth(req, res, next) {
  // For now allow all requests through in dev.
  next();
};
