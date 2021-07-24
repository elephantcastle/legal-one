const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const readableDatevalues = function(timestamp) {
  const date = new Date(timestamp);
  let datevalues = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
  };
  return datevalues;
};

const readableHours = function(date) {
  const readableValues = readableDatevalues(date);
  return `${readableValues.hour}:${readableValues.minutes}`;
};

const readableDate = function(date) {
  const readableValues = readableDatevalues(date);
  return `${readableValues.day}/${readableValues.month}/${readableValues.year} ${readableValues.hour}:${readableValues.minutes}`;
};

export { groupBy, readableDate, readableHours };
