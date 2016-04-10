MOCHA_BIN = ./node_modules/mocha/bin/mocha

# targets below are for DEVELOPMENT purposes mainly
# run tests
.PHONY: test
test:
	$(MOCHA_BIN) -R spec --timeout 1000 test/truncate.js
