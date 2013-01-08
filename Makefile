all:
	browserify demo.js > browserify-bundle.js

watch:
	browserify demo.js > browserify-bundle.js --watch
