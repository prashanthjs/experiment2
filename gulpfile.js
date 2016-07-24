'use strict';

var gulp = require('gulp'),
  path = require('path'),
  tsd = require('tsd');

gulp.task('tsd:install', function() {
  var tsdJson = './tsd.json';
  var tsdApi = new tsd.getAPI(tsdJson);
  var bower = require(path.join(process.cwd(), 'package.json'));

  var dependencies = [].concat(
    Object.keys(bower.dependencies),
    Object.keys(bower.devDependencies)
  );

  var query = new tsd.Query();
  dependencies.forEach(function(dependency) {
    query.addNamePattern(dependency);
  });

  var options = new tsd.Options();
  options.resolveDependencies = true;
  options.overwriteFiles = false;
  options.saveBundle = true;

  return tsdApi.readConfig()
    .then(function() {
      return tsdApi.select(query, options);
    })
    .then(function(selection) {
      return tsdApi.install(selection, options);
    })
    .then(function(installResult) {
      var written = Object.keys(installResult.written.dict);
      var removed = Object.keys(installResult.removed.dict);
      var skipped = Object.keys(installResult.skipped.dict);

      written.forEach(function(dts) {
        console.log('Definition file written: ' + dts);
      });

      removed.forEach(function(dts) {
        console.log('Definition file removed: ' + dts);
      });

      skipped.forEach(function(dts) {
        console.log('Definition file skipped: ' + dts);
      });
    });
});