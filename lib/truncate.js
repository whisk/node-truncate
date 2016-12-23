'use strict';

var default_len = 80;
module.exports = function(_default_len) {
  default_len = _default_len;
}

/**
 * Truncate string nicely by appending '...'
 * @method
 * @param  {Integer} max_len
 * @param  {String}  appender
 * @return {String}
 */
String.prototype.truncate = function(max_len, appender) {
  max_len  = max_len || default_len;
  appender = appender || '...';
  if (appender.length >= max_len) {
    throw Error('appender length is greater or equal to max_len');
  }
  if (this.length <= max_len) {
    return this;
  } else {
    return this.substr(0, max_len - appender.length) + appender;
  }
};

/**
 * Cast buffer to hex string and truncate it nicely by appending '...'
 * @method
 * @param  {Integer} max_len
 * @param  {String}  format
 * @param  {string}  appender
 * @return {String}
 */
Buffer.prototype.truncate = function(max_len, format, appender) {
  max_len  = max_len || default_len;
  format   = format  || 'hex';
  return this.toString(format).truncate(max_len, appender);
};
