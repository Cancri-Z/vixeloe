function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

function ensureAdmin(req, res, next) {
  const adminEmail = 'abedusamuel01@gmail.com';
  if (req.session.user && req.session.user.email === adminEmail) {
    return next();
  }
  res.status(403).send('Access denied');
}

module.exports = { ensureAuthenticated, ensureAdmin };