// a higher order function that helps to reduce try catch for every route
module.exports = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next).catch(next));
};
