# Integración y aprovisionamiento

Vamos a usar Vagrant como entorno de desarrollo virtualizado usando como provider VirtualBox.
El archivo de configuración que nos permite automatizar la creación de la máquina virtual es el siguiente:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Damos un nombre a la VM en Vagrant
  config.vm.define "ECM"
  # Utilizamos Ubuntu/trusty64 por ser la 'box' más descargada
  # y por consiguiente contar con una mayor comunidad a sus espaldas.
  config.vm.box = "ubuntu/trusty64"

  # Configuramos virtualbox
  config.vm.provider "virtualbox" do |vb|
    # Desactivamos la interfaz gráfica
    vb.gui = false
    # Asignamos 1GB de memoria RAM
    vb.memory = "1024"
  end

  # Configuramos la carga de nuestro playbook de ansible
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provision/playbook.yml"
  end
end
```

La maquina virtual tendrá el nombre de 'ECM' y usaremos como base 'Ubuntu_Trusty' por ser la imagen más usada en Vagrant y contar, por tanto, con gran soporte de la comunidad. Indicamos que como provider usaremos VirtualBox y asignamos 1GB de memoria RAM. Por últimio indicamos el provider que usaremos: 'ansible'.  
El archivo de configuración de aprovisionamiento de ansible (playbook) lo hemos definido así:

```yaml
---
# Como host tendremos el nombre que le hemos dado a la VM en Vagrant
- hosts: ECM
  # Necesitamos privilegios para instalar npm y git
  become: yes
  # Comenzamos la definición de tareas
  tasks:
    # Instala los paquetes básicos para comenzar con la instalación (npm y git)
  - name: instala npm
    changed_when: false
    apt:
      name: npm

  - name: instala git
    changed_when: false
    apt:
      name: git
  # Clonamos el repositorio del microservicio una vez que ya hemos instalado git
  - name: clona repositorio de microservicio
    changed_when: false
    git:
      repo: 'https://github.com/JJavier98/IV-Project'
      dest: ./IV-Project
      clone: yes
      update: no
  # Seguimos con otro paquete básico, node, que lo instalamos mediante
  # un script para poder definir la versión que queremos instalar
  - name: permisos de ejecución a script
    shell: chmod +x /IV-Project/provision/install_nodejs_8.10.sh
    changed_when: false

  - name: instala nodejs
    shell: ./IV-Project/provision/install_nodejs_8.10.sh
    changed_when: false
  # Instalamos todas las dependencias marcadas en package.json
  - name: instala dependencias de package.json
    changed_when: false
    npm:
      path: ./IV-Project
```

Con Ansible configuramos las acciones por defecto que se realizan cuando se crea la máquina virtual con Vagrant. Instalamos 'git' y 'npm', clonamos el repositorio con el microservicio, damos permisos de ejecución a un script que nos permite instalar la versión adecuada de node.js y por último instalamos todas las dependencias definidas en 'package.json'.

Con la herramienta de construcción podemos realizar las operaciones más básicas:

> **gulp vm-up**: Inicia la VM con provisionamiento
**gulp vm-stop**: Para el funcionamiento de la VM.
**gulp vm-destroy**: Elimina la VM
**gulp vm-ssh**: Conecta con la VM con ssh.

# Imagen en Vagrantup.com

Para subir nuestra imagen a la web de Vagrant debemos ejecutar este coamndo

> vagrant package --output ecm.box

Una vez creada la imagen de la VM dbemos ir a la página de Vagrant, registrarnos y crear una nueva 'box'. Debemos darle un nombre, asignar una versión y seleccionar un 'provider'. En este último paso nos permite seleccionar el archivo que hemos creado.
La imagen de la VM de este microservicio se puede descargar [aquí](https://app.vagrantup.com/JJavier98/boxes/ECM).