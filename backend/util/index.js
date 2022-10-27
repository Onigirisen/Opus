const normalized = (array) => {
  const normalizedObj = {};
  array.forEach((obj) => {
    normalizedObj[obj._id] = obj;
  });
  return normalizedObj;
};

module.exports = { normalized };
