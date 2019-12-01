## Heroku

Para hacer el despliegue gratuito de nuestro servicion en el PaaS Heroku lo podemos hacer de dos maneras. Bien mediante el toolbelt administrado por Heroku o asociando el despliegue a un servicio de control de versiones como GitHub. Aunque decidamos optar por la segunda opción, la mayoría de los pasos de la "versión" Toolbelt son comunes. Vamos a explicar paso a paso ambos casos pero hay que indicar también que la propia página de Heroku tiene un tutorial para realizar estos pasos $\rightarrow$ [tutorial de Heroku](https://devcenter.heroku.com/start)

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

Una vez instalado haremos _log in_. Este comando abrirá nuestro navegador y nos pedirá iniciar sesión.

```bash
heroku login
```

Una vez consigamos "_loguearnos_" es un buen momento para cerciorarnos de que tenemos node, npm y git instalados. En caso negativo debemos instalarlos.