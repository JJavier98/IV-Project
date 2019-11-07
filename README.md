# :zap: Gestión de comunidades energéticas

[![Build Status](https://travis-ci.org/JJavier98/IV-Project.svg?branch=master)](https://travis-ci.org/JJavier98/IV-Project)
[![CircleCI](https://circleci.com/gh/JJavier98/IV-Project.svg?style=svg)](https://circleci.com/gh/JJavier98/IV-Project)

## :books: Documentación
Se muestran las distintas clases, métodos y funciones del proyecto. Además en la página principal ___HOME___ mostramos los comandos principales de la herramienta de construcción ***npm***.

Para ver la documentación del proyecto pulse [aquí](https://jjavier98.github.io/IV-Project/).

## :page_facing_up: Contextualización
Suponemos la existencia de una app de comunidades energéticas para los gestores de estas comunidades. Los gestores informarán a los miembros de la comunidad cuándo es el mejor momento de producir o consumir energía a través de la app. Los miembros de la comunidad poseen algún tipo de recurso energético distribuido (DER) que puede ser programado para consumir o generar energía (instalación fotovoltaica, batería, cargador de coche eléctrico, aire acondicionado inteligente...)

## :pencil: Funcionalidades del Microservicio
La API a desarrollar presentará una lista de servicios de **creación, actualización y borrado de comunidades energéticas** para la app del gestor y ofrecer la opción de **inscripción en la web de nuevos miembros** de la comunidad.

## :notebook_with_decorative_cover: Requisitos
Una **comunidad energética** está compuesta por un **nombre único, una descripción y unas coordenadas GPS** (latitud, longitud). Y está relacionada con un **único gestor**.

Para **inscribirse** a una comunidad se pide obligatoriamente un código de **documento de identidad, el nombre del miembro y las coordenadas GPS donde están instalado el recurso distribuido (DER) y un nombre para el DER.** Además existe un campo opcional para los apellidos.

Para que la **inscripción** a la comunidad sea posible es necesario encontrar la **comunidad más cercana** utilizando las coordenadas GPS de la comunidad y del DER. En cualquier caso la distancia no puede ser mayor de 500 metros.

## :computer: Herramientas

En general, todas las herramientas que aquí aparecen han sido escogidas por su popularidad y el prestigio ganado en la comunidad de desarrolladores.

- **Lenguaje:** Utilizaremos [**Node.js**](https://nodejs.org/es/) como lenguaje debido a sus especificaciones (liviano y eficiente).
- **Framework API REST:** Para ayudarnos a montar el microservicio utilizaremos el framework [**ExpressJS**](https://expressjs.com/es/).
- **Base de datos:** Como biblioteca para manejar base de datos: [**CouchDB**](https://couchdb.apache.org/).
- **Despliegue de contenedores:** Para crear contenedores usaremos [**Docker**](https://www.docker.com/).
- **Integración Contínua:** Para implementar CI en el el proyecto vamos a usar [**Travis CI**](https://travis-ci.org/).
- **Framework Tests:** Para realizar de test durante el desarrollo: [**Mocha**](https://mochajs.org/).
- **Logs:** El framework ExpressJS proporciona un sistema logs. Si no fuera suficiente con el mismo se buscaría un servicio más completo para este propósito.