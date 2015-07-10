var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(["*.html", "css/*", "js/*"], function(event) {
    gulp.src(event.path, {read: false})
      .pipe(livereload());
  });
});
