var crypto = require('crypto');

module.exports.createID = function(id) {
    return crypto.createHash('sha1').update(id).digest('hex');
};


module.exports.uid = function(len) {
  var buf = [],
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};
