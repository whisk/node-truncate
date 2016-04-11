# node-truncate

[![Build Status](https://travis-ci.org/whisk/node-truncate.svg?branch=master)](https://travis-ci.org/whisk/node-truncate)

## Synopsis

Truncate strings and buffers nicely for Node.js. Extends String prototype.

## Code Example

```
> 'This long string to be truncated to length 16'.truncate(16);
'This long str...'

> 'Now with different ending'.truncate(16, '--');
'Now with diffe--'

> 'Default length is 80, so this is not truncated'.truncate();
'Default length is 80, so this is not truncated'

> new Buffer('c297a382dc5de998016d', 'hex').truncate(16) // converts to String
'c297a382dc5de...'
```

## License

MIT