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
