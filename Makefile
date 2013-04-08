bin=node_modules/.bin
name=ng-time-relative
browserify=$(bin)/browserify
uglify=$(bin)/uglifyjs

build: prep \
       dist/$(name).js \
       dist/$(name).min.js

dist/$(name).js: index.js
	$(browserify) -d -s $(name) index.js > $@

dist/$(name).min.js: dist/$(name).js
	$(uglify) $< > $@

clean:
	rm -rf dist

prep:
	@mkdir -p dist

.PHONY: build clean prep
