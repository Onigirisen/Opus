const normalized = (array) => {
  const normalizedObj = {};
  array.forEach((obj) => {
    normalizedObj[obj._id] = obj;
  });
  return normalizedObj;
};

const toObjectId = function (string) {
  const ObjectId = require("mongoose").Types.ObjectId;
  return new ObjectId(string);
};

module.exports = { normalized, toObjectId };
