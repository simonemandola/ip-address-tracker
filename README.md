## 1. Install npm

Install packaje-lock.json

```bash
npm init
```

## 2. Gulp

### 2.1. Install Gulp

The Installation will be global (⚠ *If it hasn't been installed yet*)

```bash
npm install --global gulp-cli
```

In the project folder, run the command (*If it has already been installed globally*)

```bash
npm install gulp
```

### 2.2. Install dependencies

Copy and paste all dependecies

```bash
npm i browser-sync gulp-exec gulp-sourcemaps gulp-babel gulp-uglify gulp-rename gulp-concat gulp-dart-sass gulp-htmlmin gulp-iconfont
```

If you are not using framework you need 'babel/core'

```bash
npm install @babel/core --save
```

also you need 'babel/preset-env'

```bash
npm i @babel/preset-env
```

On Windows

Line 41~ "gulpfile.js"

```jsx
.pipe(exec('rmdir dist'))
```

### 2.3. Create gulpfile.js

In the root directory create gulpfile.js

```jsx
//===
// IMPORTS
//===
const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const exec = require('gulp-exec');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sass = require('gulp-dart-sass');
const htmlmin = require('gulp-htmlmin');
const iconfont = require('gulp-iconfont');

//===
// VARIABLES
//===
const runTimestamp = Math.round(Date.now() / 1000);
const SRC_PATH = 'src/assets';
const DEST_PATH = 'public';
const DIST_JS = 'main.min.js';

//===
// TASKS
//===

// Static server with reload
function initBrowserSync(cb) {
    browserSync.init({
        /*server: {   // Folder
            baseDir: "./" + DEST_PATH
        }*/
        proxy: "localhost:8000"
    });
    return cb;
}

// Delete dist folder
function cleanOld() {
    return src('.')
        // .pipe(exec('rm -rf dist')) LINUX
        .pipe(exec('rmdir dist')) // WINDOWS
        .pipe(exec('mkdir dist'));
}

// HTML min
function html() {
    return src(SRC_PATH + '/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(DEST_PATH))
        .pipe(browserSync.stream()) ;
}

// Compile SASS + sourcemaps
function sassCompile() {
    return src([SRC_PATH + '/sass/mobile.sass', SRC_PATH + '/sass/desktop.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(DEST_PATH + '/css/'))
        .pipe(browserSync.stream()) ;
}

// IMGs
function img() {
    return src(SRC_PATH + '/img/**/*')
        .pipe(dest(DEST_PATH + '/img/'))
        .pipe(browserSync.stream()) ;
}

// VIDEOs
function video() {
    return src(SRC_PATH + '/video/**/*')
        .pipe(dest(DEST_PATH + '/video/'))
        .pipe(browserSync.stream()) ;
}

// Copy fonts
function fonts() {
    return src(SRC_PATH + "/fonts/**/*")
        .pipe(dest(DEST_PATH + "/fonts/"))
        .pipe(browserSync.stream());
}

// Build Font icons. *.svg to font-icons.woff2
function buildFontIcons() {
    return src(SRC_PATH + '/fonts/icons/*.svg')
        .pipe(iconfont({
            fontName: 'font-icons',
            prependUnicode: true,
            formats: ['woff2'],
            timestamp: runTimestamp
        }))
        .pipe(dest(DEST_PATH + '/fonts/'))
        .pipe(browserSync.stream());
}

// JS concat + sourcemaps + babel + min
function js() {
    return src([SRC_PATH + '/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat(DIST_JS))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(DEST_PATH + '/js/'))
        .pipe(browserSync.stream()) ;
}

// JSON copy
function json() {
    return src([SRC_PATH + '/json/*.json'])
        .pipe(dest(DEST_PATH + '/json/'))
        .pipe(browserSync.stream()) ;
}

//===
// Commands
//===

const build = series(cleanOld, parallel(html, sassCompile, img, video, fonts, buildFontIcons, js, json));

// gulp dev
exports.dev = function () {
    build();
    watch(SRC_PATH + '/*.html', html);
    watch([SRC_PATH + '/sass/*.sass', SRC_PATH + '/sass/**/*.sass'], sassCompile);
    watch(SRC_PATH + '/**/*', img);
    watch(SRC_PATH + '/**/*', video);
    watch(SRC_PATH + '/js/*.js', js);
    watch(SRC_PATH + '/json/*.json', js);
    watch([SRC_PATH + '/fonts/*', SRC_PATH + '/fonts/**/*'], fonts);
    initBrowserSync();
}

// gulp
exports.default = build;
```

### 2.4. Run Gulp

In project folder, run the command (*develop mode*)

```bash
gulp dev
```

## 3. Add assets directory

Create '**src**' dir in the root of project and add '**assets**' dir

[assets.rar](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/851db94e-4854-47ea-87d1-5270b56c5146/assets.rar)

## 4. Add index.html

If you don't use any framework, in **root** dir add **index.html**

### Basic <head />

```html
<!DOCTYPE html>
<html lang="en">
		<head>
				<meta charset="utf-8">
				<title>Inicio</title>
				<link rel="icon" type="image/png" href="favicon.png">
				<meta name="theme-color" content="#1a1a1a">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
				<meta name="author" content="Tu nombre">
				<meta name="generator" content="Clojure">
				<meta name="keywords" content="html, css, javascript">
				<meta name="description" content="my description...">
				<meta property="og:image" content="img/screenshot.png">
				<meta property="og:title" content="The Rock">
				<meta property="og:type" content="website">
				<meta property="og:url" content="">
				<meta name="twitter:card" content="summary">
				<meta name="twitter:site" content="@cuenta">
				<meta name="twitter:creator" content="@cuenta">
				<meta property="og:image:secure_url" content="https://...">
				<meta property="og:image:type" content="image/jpeg">
				<meta property="og:image:width" content="400">
				<meta property="og:image:height" content="300">
				<meta property="og:image:alt" content="">
				<link rel="stylesheet" href="css/mobile.min.css" media="all and (max-width: 600px)">
		    <link rel="stylesheet" href="css/desktop.min.css" media="all and (min-width: 601px)">
		</head>
			<body>
		
					<script src="main.js"></script>
			</body>	
</html>
```

## 5. Add main.js

In **src** directory add **main.js**, then import all .js files

## 6. Add .gitignore

In '**root**' dir add .gitignore

```markdown
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```