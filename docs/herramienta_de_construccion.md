## :hammer: Herramienta de construcción: GULP
Usamos gulp por su sencillez y rendimiento. Tiene una amplia comunidad de usuarios y dispone de más de 4000 plugins para implementar toda clase de tareas y utilidades en nuestra herramienta de construcción. Para tener una información más detallada puedes visitar su [página oficial](https://gulpjs.com/).

En particular, para este proyecto contamos con las siguientes tareas:  

- ```gulp install: ``` Instala todas las dependencias necesarias para el despliegue y desarrollo del microservicio.
- ```gulp start: ``` Inicia el proyecto con la gerramienta pm2.
- ```gulp stop: ``` Detiene el servicio previamente lanzado con _gulp start_.
- ```gulp restart: ``` Reinicia el servicio con la herramienta pm2. Un comando útil que ahorra ejecutar los dos anteriores.
- ```gulp test: ``` Somete el servicio a una serie de tests para comprobar su buen funcionamiento, tanto a nivel de servidor como de API.
- ```gulp doc: ``` Abre en el navegador la documentación de la API. Es posible que necesite recargar una vez abierta la página en el navegador.