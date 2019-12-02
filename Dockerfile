# Imagen a partir de la imagen oficial de Node con Alpine
FROM node:8-alpine

# Información del autor
LABEL maintainer='José Javier Alonso (jjavier.ar98@gmail.com)'

# Creamos el directorio de trabajo de nuestro proyecto
WORKDIR /ecm

ENV PORT 8888

# Copiamos los archivos necesarios para el funcionamiento de la aplicación
COPY package.json ./
COPY src ./src
COPY db ./db
COPY config ./config
COPY gulpfile.js ./
#COPY . .

# Instalamos las dependencias del proyecto
RUN npm install

# Instalamos gulp, que es la herramienta de construcción principal
RUN npm install -g gulp

CMD ["gulp", "start-docker"]

EXPOSE 8888