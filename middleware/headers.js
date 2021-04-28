<<<<<<< HEAD
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('access-control-allow-methods', 'POST, PUT, GET, DELETE, OPTIONS');
  res.header('access-control-allow-headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization')
  return next();
}

module.exports = cors;
=======
module.exports = function(req, res, next) {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');

    return next();
};
>>>>>>> 14bbdef428bed03115039fe98e188754f5915de2
