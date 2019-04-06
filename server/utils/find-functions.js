function findLastValue(array, value, oldvalue, valuekey, valueadd = 1) {
  if (
    array.filter(x => x[valuekey] == parseInt(value, 10)).length != 0 ||
    value == 0 ||
    value == ``
  ) {
    if (
      oldvalue !=
      parseInt(
        array.reduce((prev, current) =>
          prev[valuekey] > current[valuekey] ? prev : current
        )[valuekey],
        10
      )
    ) {
      value =
        valueadd +
        parseInt(
          array.reduce((prev, current) =>
            prev[valuekey] > current[valuekey] ? prev : current
          )[valuekey],
          10
        );
    } else {
      value = oldvalue;
    }
  }
  return value;
}
module.exports.findLastValue = findLastValue;

function takeMasiv(array) {
  array
    .find()
    .exec()
    .then(value => {
      return value;
    })
    .catch(err => next(err));
}
module.exports.takeMasiv = takeMasiv;
