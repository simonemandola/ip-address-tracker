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

## 5. Add main.js

In **src** directory add **main.js**, then import all .js files

## 6. Add .gitignore

In '**root**' dir add .gitignore
