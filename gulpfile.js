const gulp = require('gulp');
const pm2 = require('pm2');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');
var swagger = require('gulp-swagger');
var apidoc = require('gulp-apidoc');
var swaggerGenerator = require('gulp-apidoc-swagger');

// Instala las dependencias necesarias para utilizar el microservicio
gulp.task('install', function(cb) {
  exec('npm install', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

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

// Inicia el servicio
gulp.task('start-docker', function(cb) {
  exec('node src/index.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
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
gulp.task('test', () => (
    gulp.src('test/*.js', {read: false}).pipe(mocha({reporter:'spec'}))
));

// Ejecuta los test de mocha
gulp.task('open-url', () => (
    exec('xdg-open http://localhost:8888/api-docs')
));

// Abre la web de documentación
gulp.task('doc', async () => {
  await exec('gulp start')
  exec('gulp open-url')
});

// Tarea default que instala los requisitos y ejecuta los test posteriormente
gulp.task('default', gulp.series('test'));