// Dependencies
const {src, dest, series, parallel} = require('gulp')
// const concat = require('gulp-concat')
// const debug = require('gulp-debug')
const gulpDest = require('gulp-dest')
const terser = require('gulp-terser')
const del = require('del')
const _ = require('lodash')

// Unit Testing
// const mocha = require('mocha')
// const chai = require('chai')

// Task Specific
const standard = require('gulp-standard')
// const gulpStylelint = require('gulp-stylelint')
const minCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')

// Interpreters
const babel = require('gulp-babel')
const less = require('gulp-less')
const sass = require('gulp-sass')
const coffee = require('gulp-coffee')
// const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')

// Project
const tsProject = ts.createProject('tsconfig.json')

// Helper Functions
const nullify = function (proto) {
  proto = proto || []
  const clone = _.clone(proto)
  if (_.size(proto)) {
    _.each(clone, function (value, key, list) {
      list[key] = '!' + value
    })
  }
  return clone
}

const babelSettings = {
  /* *
  presets: [
    ['env', {
      targets: {
        // The % refers to the global coverage of users from browserslist
        browsers: ['>0.25%']
      }
      // exclude: ['transform-strict-mode']
    }]
  ],
  /* */
  plugins: [
    // 'transform-runtime',
    ['transform-es2015-modules-commonjs', {
      allowTopLevelThis: true,
      strictMode: false
    }]
  ]
}

// Locations
const location = {
  mangle: {
    core: [
      'Sitetheory/*/Resources/public/dist/*/*.js'
    ],
    min: [
      'Sitetheory/*/Resources/public/dist/*/*.min.js'
    ]
  },
  preserve: {
    core: [
      'Sitetheory/*/Resources/public/js/**/*.js',
      'Sitetheory/*/Resources/public/stratus/**/*.js'
    ],
    min: [
      'Sitetheory/*/Resources/public/js/**/*.min.js',
      'Sitetheory/*/Resources/public/stratus/**/*.min.js'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.js',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.js',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.js',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.js',
    ],
    nonstandard: [
      'Sitetheory/*/Resources/public/js/examples/*.js',
      'Sitetheory/*/Resources/public/stratus/**/deprecated-reference/*.js',
    ]
  },
  less: {
    core: [
      'Sitetheory/*/Resources/public/css/**/*.less',
      'Sitetheory/*/Resources/public/stratus/**/*.less',
      'Sitetheory/*/src/*/*/Resources/public/css/**/*.less'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.less',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.less',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.less',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.less',
    ],
    compile: []
  },
  sass: {
    core: [
      'Sitetheory/*/Resources/public/css/**/*.scss',
      'Sitetheory/*/Resources/public/stratus/**/*.scss',
      'Sitetheory/*/src/*/*/Resources/public/css/**/*.scss'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.scss',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.scss',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.scss',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.scss'
    ],
    compile: []
  },
  css: {
    core: [
      'Sitetheory/*/Resources/public/css/**/*.css',
      'Sitetheory/*/Resources/public/stratus/**/*.css',
      'Sitetheory/*/src/*/*/Resources/public/css/**/*.css'
    ],
    min: [
      'Sitetheory/*/Resources/public/css/**/*.min.css',
      'Sitetheory/*/Resources/public/stratus/**/*.min.css',
      'Sitetheory/*/src/*/*/Resources/public/css/**/*.min.css'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.css',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.css',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.css',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.css'
    ]
  },
  coffee: {
    core: [
      'Sitetheory/*/Resources/public/js/**/*.coffee',
      'Sitetheory/*/Resources/public/stratus/**/*.coffee',
      'Sitetheory/*/src/*/*/Resources/public/js/**/*.coffee'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.coffee',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.coffee',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.coffee',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.coffee'
    ],
    compile: []
  },
  typescript: {
    core: [
      'Sitetheory/*/Resources/public/js/**/*.ts',
      'Sitetheory/*/Resources/public/stratus/**/*.ts',
      'Sitetheory/*/src/*/*/Resources/public/js/**/*.ts'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.ts',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.ts',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.ts',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.ts'
    ],
    compile: []
  },
  template: {
    core: [
      'Sitetheory/*/Resources/public/js/**/*.html',
      'Sitetheory/*/Resources/public/stratus/**/*.html'
    ],
    min: [
      'Sitetheory/*/Resources/public/js/**/*.min.html',
      'Sitetheory/*/Resources/public/stratus/**/*.min.html'
    ],
    external: [
      'Sitetheory/*/Resources/public/js/bower_components/**/*.html',
      'Sitetheory/*/Resources/public/stratus/bower_components/**/*.html',
      'Sitetheory/*/Resources/public/js/node_modules/**/*.html',
      'Sitetheory/*/Resources/public/stratus/node_modules/**/*.html'
    ],
    nonstandard: [
      'Sitetheory/*/Resources/public/js/deprecated/**/*.html',
      'Sitetheory/*/Resources/public/stratus/deprecated/**/*.html'
    ]
  }
}

// Code Linters
function lintJS () {
  return src(_.union(location.preserve.core, nullify(location.preserve.min), nullify(location.preserve.external), nullify(location.preserve.nonstandard)))
    /* *
    .pipe(debug({
      title: 'Standardize:'
    }))
    /* */
    .pipe(standard())
    .pipe(standard.reporter('default', {
      fix: true,
      breakOnError: true,
      breakOnWarning: true,
      showRuleNames: true
    }))
}

// Mangle Functions
function cleanMangle () {
  if (!location.mangle.min.length) {
    return Promise.resolve('No files selected.')
  }
  return del(location.mangle.min)
}
function compressMangle () {
  return src(_.union(location.mangle.core, nullify(location.mangle.min)), {
    base: '.'
  })
    /* *
    .pipe(debug({
      title: 'Compress Mangle:'
    }))
    /* */
    .pipe(babel(babelSettings))
    .pipe(terser({
      // preserveComments: 'license',
      mangle: true
    }))
    .pipe(gulpDest('.', {
      ext: '.min.js'
    }))
    .pipe(dest('.'))
}

// Preserve Functions
function cleanPreserve () {
  if (!location.preserve.min.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.preserve.min, nullify(location.preserve.external)))
}
function compressPreserve () {
  return src(_.union(location.preserve.core, nullify(location.preserve.min), nullify(location.preserve.external)), {
    base: '.'
  })
    /* *
    .pipe(debug({
      title: 'Compress Preserve:'
    }))
    /* */
    .pipe(babel(babelSettings))
    .pipe(terser({
      // preserveComments: 'license',
      mangle: false
    }))
    .pipe(gulpDest('.', {
      ext: '.min.js'
    }))
    .pipe(dest('.'))
}

// LESS Functions
const cleanLESS = function () {
  if (!location.less.compile.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.less.compile, nullify(location.less.external)))
}
function compileLESS () {
  return src(_.union(location.less.core, nullify(location.less.compile), nullify(location.less.external)), { base: '.' })
    // .pipe(debug({ title: 'Compile LESS:' }))
    .pipe(less({
      globalVars: {
        asset: "'/assets/1/0'"
      }
    }))
    .pipe(gulpDest('.', { ext: '.css' }))
    .pipe(dest('.'))
}

// SASS Functions
function cleanSASS () {
  if (!location.sass.compile.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.sass.compile, nullify(location.sass.external)))
}
function compileSASS () {
  return src(_.union(location.sass.core, nullify(location.sass.compile), nullify(location.sass.external)), { base: '.' })
    // .pipe(debug({ title: 'Compile SASS:' }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpDest('.', { ext: '.css' }))
    .pipe(dest('.'))
}

// CSS Functions
function cleanCSS () {
  if (!location.css.min.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.css.min, nullify(location.css.external)))
}
function compressCSS () {
  return src(_.union(location.css.core, nullify(location.css.min), nullify(location.css.external)), { base: '.' })
    // .pipe(debug({ title: 'Compress CSS:' }))
    .pipe(minCSS({
      compatibility: '*'
    }))
    .pipe(gulpDest('.', { ext: '.min.css' }))
    .pipe(dest('.'))
}

// CoffeeScript Functions
function cleanCoffee () {
  if (!location.coffee.compile.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.coffee.compile, nullify(location.coffee.external)))
}
function compileCoffee () {
  return src(_.union(location.coffee.core, nullify(location.coffee.compile), nullify(location.coffee.external)), { base: '.' })
    // .pipe(debug({ title: 'Compile Coffee:' }))
    .pipe(coffee({}))
    .pipe(gulpDest('.', { ext: '.js' }))
    .pipe(dest('.'))
}

// TypeScript Functions
function cleanTypeScript () {
  if (!location.typescript.compile.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.typescript.compile, nullify(location.typescript.external)))
}
function compileTypeScript () {
  return src(_.union(location.typescript.core, nullify(location.typescript.compile), nullify(location.typescript.external)), { base: '.' })
    // .pipe(debug({ title: 'Compile TypeScript:' }))
    // .pipe(sourcemaps.init())
    .pipe(tsProject())
    // .pipe(sourcemaps.write())
    .pipe(gulpDest('.', { ext: '.js' }))
    .pipe(dest('.'))
}

// Template Functions
const cleanTemplate = function () {
  if (!location.template.min.length) {
    return Promise.resolve('No files selected.')
  }
  return del(_.union(location.template.min, nullify(location.template.external), nullify(location.template.nonstandard)))
}
function compressTemplate () {
  return src(_.union(location.template.core, nullify(location.template.min), nullify(location.template.external), nullify(location.template.nonstandard)), {
    base: '.'
  })
    /* *
    .pipe(debug({
      title: 'Compress Template:'
    }))
    /* */
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))
    .pipe(gulpDest('.', {
      ext: '.min.html'
    }))
    .pipe(dest('.'))
}

// Modules Exports
exports.compile = parallel(
  series(cleanLESS, compileLESS),
  series(cleanSASS, compileSASS),
  series(cleanCoffee, compileCoffee),
  series(cleanTypeScript, compileTypeScript)
)
exports.compress = parallel(
  series(cleanMangle, compressMangle),
  series(cleanPreserve, compressPreserve),
  series(cleanCSS, compressCSS),
  series(cleanTemplate, compressTemplate)
)
exports.clean = parallel(
  cleanMangle,
  cleanPreserve,
  cleanLESS,
  cleanSASS,
  cleanCSS,
  cleanCoffee,
  cleanTypeScript,
  cleanTemplate
)
exports.lint = parallel(
  lintJS
)
