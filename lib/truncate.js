'use strict';

/**
 * Truncate string nicely by appending '...'
 * @method
 * @param  {Integer=} max_len
 * @param  {String=}  appender
 * @return {String}
 */
String.prototype.truncate = function(max_len, appender) {
  max_len  = max_len || 80;
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