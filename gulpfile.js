const gulp = require('gulp');
const pm2 = require('pm2');
var exec = require('child_process').exec;
var jest = require('gulp-jest').default;
var mocha = require('gulp-mocha');
var swagger = require('gulp-swagger');
var apidoc = require('gulp-apidoc');
var swaggerGenerator = require('gulp-apidoc-swagger');

// Tarea para iniciar el servidor creando una instancia de pm2
gulp.task('start', function(cb) {
    pm2.connect(false, function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            name: 'EnergyCommunityManager',
            script: './src/index.js',
            execMode: 'cluster',
            instances: 1
        }, function (err) {
            if (err) {
                throw err;
        }
            console.log("Iniciando servidor EnergyCommunityManager");
        });
    })
    pm2.disconnect();
});

// Detiene la instancia de pm2 del servidor en ejecución
gulp.task('stop', function(cb) {
  exec('node node_modules/.bin/pm2 stop ./src/index.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Reinicia el servidor
gulp.task('restart', function(cb) {
  exec('node node_modules/.bin/pm2 restart ./src/index.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// Ejecuta los test de mocha
gulp.task('mocha', () => (
    gulp.src('test/*.mocha.js', {read: false}).pipe(mocha({reporter:'spec'}))
));

// Ejecuta los test de jest
gulp.task('jest', () => (
    gulp.src('test/*.test.js', {read: false}).pipe(jest({reporter:'default'}))
));

// Ejecuta todos los test
gulp.task('test', gulp.series('mocha', 'jest'));

// Comprueba la cobertura de los test sobre el código
gulp.task('coveralls', function(cb) {
  exec('npm run coveralls', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

/*
// Compila toda la documentación del proyecto y la almacena en el directorio docs/
gulp.task('doc', function(done){
  exec('jsdoc ./src/gymManager.js -d ./docs/gymManager', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
  apidoc({
    src: "./src/routes",
    dest: "./docs/rest",
    config: "./"
  }, done);
});
*/
gulp.task('doc', function(done){
    swaggerGenerator.exec({
        src: "src/",
        dest: "doc/"
      });
});

// Tarea default que instala los requisitos y ejecuta los test posteriormente
gulp.task('default', gulp.series('test'));