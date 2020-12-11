const { src, dest, watch, series, parallel } = require("gulp");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins();
const autoprefixer = require("autoprefixer");
const server = require("browser-sync");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

function imgImagemin() {
  return src("./src/images/*")
    .pipe(
      $.imagemin(
        [
          imageminMozjpeg({
            quality: 80,
          }),
          imageminPngquant(),
          imageminSvgo({
            plugins: [
              {
                removeViewbox: false,
              },
            ],
          }),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe(dest("./dist/images"));
}

function styles() {
  return src("./src/**/*.scss")
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe($.sass())
    .pipe($.postcss([autoprefixer()]))
    .pipe(dest("./dist/css"))
    .pipe($.cleanCss())
    .pipe(
      $.rename({
        extname: ".min.css",
      })
    )
    .pipe(dest("dist/css/"));
}

function scripts() {
  return src("./src/js/*.js")
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      $.babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("./dist/js"))
    .pipe($.uglify())
    .pipe(
      $.rename({
        extname: ".min.js",
      })
    )
    .pipe(dest("./dist/js"));
}

function startAppServer() {
  server.init({
    server: {
      baseDir: ".",
    },
  });

  watch("./src/**/*.scss", styles);
  watch("./*.html").on("change", server.reload);
  watch("./src/**/*.scss").on("change", server.reload);
}
const serve = series(parallel(styles, series(scripts)), startAppServer);
exports.comp = imgImagemin;
exports.serve = serve;
