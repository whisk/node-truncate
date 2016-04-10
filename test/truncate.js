'use strict';

var assert = require('assert');

require('../lib/truncate');

describe('String', function() {
  describe('truncate', function() {
    it('should truncate long strings', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo...', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate());
    });

    it('should leave short strings as is', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet'.truncate());
    });

    it('should accept max_len', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo...', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate(80));
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp...', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate(79));
    });

    it('should accept max_len, appender (variable length)', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo---', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate(80, '---'));
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo--', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate(79, '--'));
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo-', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate(78, '-'));
    });

    it('should raise when appender length >= max_len', function(done) {
      try {
        'test'.truncate(3, '...');
        done('No exception!')
      } catch (e) {
        done();
      }
    });

    it('should avoid unnecessary truncate', function() {
      assert.equal('short', 'short'.truncate(5));
    });

    it('keep empty strings', function() {
      assert.equal('', ''.truncate());
    })
  });
});