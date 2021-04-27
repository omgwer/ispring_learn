
let project_folder ='dist';
let sourse_folder = '#src';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: [sourse_folder + '/*.html', '!' + sourse_folder + '/_*.html'],
    css: [sourse_folder + '/scss/*.scss', '!' + sourse_folder + '/_*.scss'],
    img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: sourse_folder + '/fonts/*.ttf',
  },
  watch: {
    html: sourse_folder + '/**/*.html',
    css: sourse_folder + '/scss/**/*.scss',
    img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  clean: './' + project_folder + '/'
}

let {src,dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin');



function browserSync() {
  browsersync.init ({
    server:{
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(fileinclude())
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())

}

function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html],html);
  gulp.watch([path.watch.css],css);
  gulp.watch([path.watch.img],images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

