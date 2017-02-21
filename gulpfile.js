// Dependencies
var gulp = require('gulp');
var debug = require('gulp-debug');
var dest = require('gulp-dest');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var _ = require('underscore');

// Helper Functions
var nullify = function (proto) {
    proto = proto || [];
    var clone = _.clone(proto);
    if (_.size(proto)) {
        _.each(clone, function (value, key, list) {
            list[key] = '!' + value;
        });
    }
    return clone;
};

// Locations
var location = {
    mangle: {
        core: [
        ],
        min: [
        ]
    },
    preserve: {
        core: [
            'Sitetheory/**/*.js'
        ],
        min: [
            'Sitetheory/**/*.min.js'
        ]
    },
    less: {
        core: [
        ],
        compile: [
        ]
    },
    css: {
        core: [
            'Sitetheory/**/*.css'
        ],
        min: [
            'Sitetheory/**/*.min.css'
        ]
    },
    template: {
        core: [
            'Sitetheory/**/*.html'
        ],
        min: [
            'Sitetheory/**/*.min.html'
        ]
    }
};

// Code Styling
gulp.task('jscs', function () {
    return gulp.src(_.union(location.mangle.core, location.preserve.core, nullify(location.mangle.min), nullify(location.preserve.min)))
        .pipe(debug({ title: 'Verify:' }))
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

// Blanket Functions
gulp.task('compile', ['compile:less']);
gulp.task('compress', ['compress:mangle', 'compress:preserve', 'compress:css', 'compress:template']);
gulp.task('clean', ['clean:mangle', 'clean:preserve', 'clean:less', 'clean:css', 'clean:template']);

// Mangle Functions
gulp.task('clean:mangle', function () {
    return gulp.src(location.mangle.min, { base: '.', read: false })
        .pipe(debug({ title: 'Clean:' }))
        .pipe(vinylPaths(del));
});
gulp.task('compress:mangle', ['clean:mangle'], function () {
    return gulp.src(_.union(location.mangle.core, nullify(location.mangle.min)), { base: '.' })
        .pipe(debug({ title: 'Mangle:' }))
        .pipe(uglify({
            preserveComments: 'license',
            mangle: true
        }))
        .pipe(dest('.', { ext: '.min.js' }))
        .pipe(gulp.dest('.'));
});

// Preserve Functions
gulp.task('clean:preserve', function () {
    return gulp.src(location.preserve.min, { base: '.', read: false })
        .pipe(debug({ title: 'Clean:' }))
        .pipe(vinylPaths(del));
});
gulp.task('compress:preserve', ['clean:preserve'], function () {
    return gulp.src(_.union(location.preserve.core, nullify(location.preserve.min)), { base: '.' })
        .pipe(debug({ title: 'Compress:' }))
        .pipe(uglify({
            preserveComments: 'license',
            mangle: false
        }))
        .pipe(dest('.', { ext: '.min.js' }))
        .pipe(gulp.dest('.'));
});

// LESS Functions
gulp.task('clean:less', function () {
    return gulp.src(location.less.compile, { base: '.', read: false })
        .pipe(debug({ title: 'Clean:' }))
        .pipe(vinylPaths(del));
});
gulp.task('compile:less', ['clean:less'], function () {
    return gulp.src(_.union(location.less.core, nullify(location.less.compile)), { base: '.' })
        .pipe(debug({ title: 'LESS:' }))
        .pipe(less({}))
        .pipe(dest('.', { ext: '.css' }))
        .pipe(gulp.dest('.'));
});

// CSS Functions
gulp.task('clean:css', function () {
    return gulp.src(location.css.min, { base: '.', read: false })
        .pipe(debug({ title: 'Clean:' }))
        .pipe(vinylPaths(del));
});
gulp.task('compress:css', ['clean:css'], function () {
    return gulp.src(_.union(location.css.core, nullify(location.css.min)), { base: '.' })
        .pipe(debug({ title: 'CSS:' }))
        .pipe(cleanCSS({
            compatibility: '*'
        }))
        .pipe(dest('.', { ext: '.min.css' }))
        .pipe(gulp.dest('.'));
});

// Template Functions
gulp.task('clean:template', function () {
    return gulp.src(location.template.min, { base: '.', read: false })
        .pipe(debug({ title: 'Clean:' }))
        .pipe(vinylPaths(del));
});
gulp.task('compress:template', ['clean:template'], function () {
    return gulp.src(_.union(location.template.core, nullify(location.template.min)), { base: '.' })
        .pipe(debug({ title: 'Template:' }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('.', { ext: '.min.html' }))
        .pipe(gulp.dest('.'));
});
