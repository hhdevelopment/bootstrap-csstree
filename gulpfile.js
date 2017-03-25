var gulp = require('gulp'),
		  less = require('gulp-less'),
		  del = require('del'),
		  postcss = require('gulp-postcss'),
		  cssnano = require('gulp-cssnano'),
		  concat = require('gulp-concat'),
		  mergecss = require('postcss-merge-selectors'),
		  path = require('path');

gulp.task('default', ['clean', 'build', 'site']);

gulp.task('build', function () {
	return gulp.src('src/less/bootstrap-csstree.less')
	  .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
	  .pipe(postcss([mergecss()]))
	  .pipe(cssnano())
	  .pipe(gulp.dest('dist')).pipe(gulp.dest('public_html'));
});
gulp.task('site', function () {
	gulp.src([	"src/demo/index.js", "src/demo/index.html", "src/demo/folders.json", "src/demo/tree-template.html"]).pipe(gulp.dest('public_html'));
	gulp.src([	"node_modules/bootstrap/dist/css/bootstrap.css",
					"node_modules/bootstrap/dist/css/bootstrap-theme.css"
				]).pipe(cssnano()).pipe(concat("vendors.css")).pipe(gulp.dest('public_html/css'));
	gulp.src([	"node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
					"node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
					"node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
					"node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
					"node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
				]).pipe(gulp.dest('public_html/fonts'));
	return gulp.src([	"node_modules/jquery/dist/jquery.min.js",
					"node_modules/angular/angular.min.js",
					"node_modules/bootstrap/dist/js/bootstrap.min.js"
				]).pipe(concat("vendors.js")).pipe(gulp.dest('public_html/js'));
});

gulp.task('clean', function () {
	return del.sync(['dist/**/*', 'public_html/**/*']);
});
