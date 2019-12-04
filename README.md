# :zap: Gestión de comunidades energéticas

[![Build Status](https://travis-ci.org/JJavier98/IV-Project.svg?branch=master)](https://travis-ci.org/JJavier98/IV-Project) [![CircleCI](https://circleci.com/gh/JJavier98/IV-Project.svg?style=svg)](https://circleci.com/gh/JJavier98/IV-Project) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## :clipboard: Descripción
Este microservicio es una utilidad para gestores de comunidades energéticas. Permite crear, modificar y eliminar comunidades además de integrar miembros en ellas.
Su descripción queda más completa en el siguiente [enlace](https://github.com/JJavier98/IV-Project/blob/master/docs/objetivo_proyecto.md).

## :inbox_tray: Instalación
```
gulp install
```

## :ballot_box_with_check: Test
```
gulp test
```
Pincha [aquí](https://github.com/JJavier98/IV-Project/blob/master/docs/tests.md) para ver una descripción más detallada de los tests realizados.

## :arrow_double_up: Iniciar microservicio
```
gulp start
```

## :arrow_double_down: Finalizar microservicio
```
gulp stop
```

## :repeat: Reiniciar microservicio
```
gulp restart
```

## :hammer: Herramienta de construcción
Como vemos en los comandos anteriores la herramienta de construcción es **Gulp**. Para saber más sobre ella clica [aqui](https://github.com/JJavier98/IV-Project/blob/master/docs/herramienta_de_construccion.md).  
buildtool: gulpfile.js

## :computer: Integración contínua
Se utiliza tanto [TravisCI](https://github.com/JJavier98/IV-Project/blob/master/docs/integracion_continua.md) como [CircleCI](https://github.com/JJavier98/IV-Project/blob/master/docs/integracion_continua.md) para respaldarnos en caso de que alguno de los dos servicios no esté operativo en algún momento, además de tener dos valoraciones que, si no hay ningún fallo, daberían ser la misma.

## :whale2: Docker
Hemos realizado la abstracción y automatización de nuestro servicio a través de contenedores Docker. Te explico cómo hacerlo [aqui](https://github.com/JJavier98/IV-Project/blob/master/docs/docker.md)

Contenedor: https://hub.docker.com/r/jjavier98/ecm

## :cloud: Despliegue Heroku
El micro servicio ha sido desplegado en Heroku y mostramos los pasos seguidos para ello en este [enlace](https://github.com/JJavier98/IV-Project/blob/master/docs/heroku.md).

Despliegue: https://energetic-communities-manager.herokuapp.com/
Despliegue Docker: https://ecm-iv.herokuapp.com/

## :cloud: Despliegue Azure
El micro servicio ha sido desplegado en Azure mediante el contenedor Docker. Puedes ver cómo en el suguiente [enlace](https://github.com/JJavier98/IV-Project/blob/master/docs/azure.md).

Despliegue Docker: https://ecm-iv.azurewebsites.net/