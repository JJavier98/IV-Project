## Heroku

Para hacer el despliegue gratuito de nuestro servicion en el PaaS Heroku lo podemos hacer de dos maneras. Bien mediante el toolbelt administrado por Heroku o asociando el despliegue a un servicio de control de versiones como GitHub. Aunque decidamos optar por la segunda opción, la mayoría de los pasos de la "versión" Toolbelt son comunes. Vamos a explicar paso a paso ambos casos pero hay que indicar también que la propia página de Heroku tiene un [tutorial](https://devcenter.heroku.com/start) para realizar estos pasos.

## Mediante Toolbelt

### Registro

En primer lugar debemos crearnos una cuenta en [Heroku](https://signup.heroku.com/dc).

### Instalación del Toolbelt o CLI

![Distros](./images/distros.png)

Para todas estas distribuciones de Linux usaremos el comando:

```bash
sudo snap install heroku --classic
```
Obtendremos una salida que nos informará de la versión que se ha instalado.
![Install](./images/install.png)

### Login

Una vez instalado haremos _log in_. Este comando abrirá nuestro navegador y nos pedirá iniciar sesión.

```bash
heroku login
```

Una vez consigamos "_loguearnos_" es un buen momento para cerciorarnos de que tenemos node, npm y git instalados. En caso negativo debemos instalarlos.

### Crear una aplicación en Heroku

Accedemos al directorio de nuestra API y ejecutamos el siguiente comando:

```bash
heroku apps:create --region eu nombre_API
```

- eu: Hace refencia a la región europea.
- nombre_API: Es el nombre que le quieras dar a tu API en Heroku.

Aquí vemos cómo se ha creado la app del microservicio:
![APP](./images/app-heroku.png)

### Definir ejecución

Dentro del directorio de nuestra API (en la raíz) debemos crear un fichero llamado _Procfile_ en el que indicaremos el comando a ejecutar para el despliegue del servicio.

```bash
web: gulp start
```

### Despliegue

Ahora si hacemos un _push_ al repositorio en heroku se desplegará nuestro microservicio

```bash
git push heroku master
```

## GitHub

Una vez hechos todos los pasos anteriores podremos enlazar el despliegue de la API con cada actualización del repositorio de nuestro servicio en GitHub.

En nuestra app en Heroku debemos ir a la pestaña _Deploy_, seleccionar como método GitHub e indicar el nombre del repositorio que contiene nuestra aplicación.

![Despliegue](./images/despliegue.png)

Y por último habilitamos la opción de que espere a la validación de la Integración Contínua (Travis y CircleCI) y clickamos en _Enable Automatic Deploys_

![CI en Heroku](./images/ci.png)
![CI en Heroku](./images/ci2.png)

## Docker
Si tenemos nuestra aplicación en un contenedor Docker podemos optar por desplegar la API desde este contenedor. Para ello deberemos crear un nuevo fichero llamado _heroku.yml_ que contendrá lo siguiente:

```yml
build:
  docker:
    web: Dockerfile
```

Esto indica a Heroku que debe dar prioridad al despliegue según indica el archivo _Dockerfile_ en vez de desplegar según el _Procfile_ como hacía antes. Como ya teníamos una aplicación desplegada vamos a crear otra para así tener una funcionando desde el contenedor y otra directamente con los archivos fuente.

Así que creamos un nuevo contenedor tal y como explicamos en la [documentación de Docker](https://github.com/JJavier98/IV-Project/blob/master/docs/docker.md) en el apartado _Creación_.

Tras el _build_ del contenedor especificamos que el despliegue en heroku será a través de este:

```bash
# Este comando indica que debe priorizar
# el archivo heroku.yml antes que el Procfile
heroku stack:set container
```

Para el despliegue manual podemos ejecutar:

```bash
git push heroku master
```

Aunque es recomendable activar la actualización automática con los _push_ a GitHub como se ha explicado anteriormente.

En esta imagen podemos ver como una aplicación está desplegada desde contenedor Docker y otra desde framework de Node.js.

![Heroku](images/heroku-container.png)