const calcTime = (offset) => {
  var d = new Date();
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = new Date(utc + 3600000 * offset);
  return nd.toLocaleString();
};

module.exports = {
  client: require("./_client"),
  calcTime
};
