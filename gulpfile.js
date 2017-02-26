var gulp = require('gulp'),
		  less = require('gulp-less'),
		  del = require('del'),
		  postcss = require('gulp-postcss'),
		  cssnano = require('gulp-cssnano'),
		  mergecss = require('postcss-merge-selectors')
		  path = require('path');

gulp.task('default', ['clean', 'build', 'site']);

gulp.task('build', function () {
	return gulp.src('src/less/tree.less')
	  .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
	  .pipe(postcss([mergecss()]))
	  .pipe(cssnano())
	  .pipe(gulp.dest('dist')).pipe(gulp.dest('public_html'));
});
gulp.task('site', function () {
	return gulp.src(['!src/less', '!src/less/*', 'dist/**/*', 'src/**/*']).pipe(gulp.dest('public_html'));
});

gulp.task('clean', function () {
	return del.sync(['dist/**/*', 'public_html/**/*']);
});
