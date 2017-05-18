var gulp = require('gulp'),
    rename = require('gulp-rename');

gulp.task('init-env', function() {
  // Just create a dummy copy of .env.example renamed to .env since
  // it shouldn't be commited to version control
  return gulp.src('.env.example')
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'));
});

gulp.task('build-client', function() {
  // Just copy the content of the client folder to the public directory
  // that is served by express-static middleware.

  // Normally you would do more complex stuff than that,
  // like transpile or bundle your client-side code for example.

  // You do not need such a task if your client-side code is rendered
  // with a template engine rather than served statically.
  return gulp.src('client/**')
    .pipe(gulp.dest('./public/'));
});

// Default task
gulp.task('default', function() {
    gulp.start('build-client');
});
