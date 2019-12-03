# Docker

Para crear un contenedor con nuestra API vamos a usar el servicio de contenedores Docker. Para configurar el proceso necesitaremos crear un archivo _Dockerfile_ y, aunque no obligatorio, un _.dockerignore_.

## Dockerfile
Este archivo contiene todos los comandos que se ejecutarán para crear el contenedor. Podemos ser muy específicos indicando cuáles son los archivos que queremos incorporar en nuestro contenedor o permitirnos ser algo más generales e indicar qué archivos no incluir especificándolos en _.dockerignore_. El Dockerfile tiene la siguiente forma:

```python
# Imagen a partir de la imagen oficial de Node con Alpine
FROM node:8-alpine

# Información del autor
LABEL maintainer='José Javier Alonso (jjavier.ar98@gmail.com)'

# Creamos el directorio de trabajo de nuestro proyecto
WORKDIR /ecm

# Puerto
ENV PORT 8888

# Copiamos los archivos necesarios para el funcionamiento de la aplicación
COPY package.json ./
COPY src ./src
COPY db ./db
COPY config ./config
COPY gulpfile.js ./

# Instalamos las dependencias del proyecto
RUN npm install

# Comando para desplegar el servicio
CMD ["node", "node_modules/.bin/gulp", "start-docker"]

EXPOSE 8888
```

## .dockerignore
En este archivo declaramos todos aquellos ficheros que no queremos que sean incluidos en nuestro contenedor. Esto nos permite ser más generales en los archivos que incluimos con el Dockerfile para después ser más finos especificando cuáles son los que no queremos. Nuestro _.dockerignore_ pinta de la siguiente manera:

```python
node_modules
npm-debug.log
```

## Local
Una vez tenemos los dos archivos listos podemos proceder a crear el contenedor.

```bash
docker build -t ecm .
```
