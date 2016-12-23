'use strict';

var assert = require('assert');

var truncate = require('../lib/truncate');
var saved_default_len;

describe('String', function() {
  before(function() {
    saved_default_len = 80;
  });
  afterEach(function() {
    truncate(saved_default_len);
  });

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

    it('should respect globally set truncate length', function() {
      truncate(79);
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp...',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'.truncate());
    });

    it('should avoid unnecessary truncate', function() {
      assert.equal('short', 'short'.truncate(5));
    });

    it('keep empty strings', function() {
      assert.equal('', ''.truncate());
    })
  });
});

describe('Buffer', function() {
  describe('truncate', function() {
    it('should convert buffers to hex', function() {
        assert.equal('616263646566', new Buffer('abcdef', 'utf-8').truncate());
    })
    it('should truncate long buffers', function() {
      assert.equal(
        'da9c91b1a4a650179e854447944cf16cd2687e7bec489c965f470561e1217d9d57aab31062254...',
        new Buffer('da9c91b1a4a650179e854447944cf16cd2687e7bec489c965f470561e1217d9d57aab310622545dec3e5a195f3', 'hex').truncate());
    });
    it('should leave short buffers as is', function() {
      assert.equal('abcdef', new Buffer('abcdef', 'hex').truncate());
    });
    it('should respect format', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        new Buffer('4c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c6974', 'hex').truncate(80, 'utf8'));
    });
    it('should respect format', function() {
      assert.equal(
        'Lorem ipsum dolor sit amet, consectet...',
        new Buffer('TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdA==', 'base64').truncate(40, 'utf8'));
    });
  });
});
