## :page_facing_up: Contextualización
Suponemos la existencia de una app de comunidades energéticas para los gestores de estas comunidades. Los gestores informarán a los miembros de la comunidad cuándo es el mejor momento de producir o consumir energía a través de la app. Los miembros de la comunidad poseen algún tipo de recurso energético distribuido (DER) que puede ser programado para consumir o generar energía (instalación fotovoltaica, batería, cargador de coche eléctrico, aire acondicionado inteligente...)

## :pencil: Funcionalidades del Microservicio
La API a desarrollar presentará una lista de servicios de **creación, actualización y borrado de comunidades energéticas** para la app del gestor y ofrecer la opción de **inscripción en la web de nuevos miembros** de la comunidad.

## :notebook_with_decorative_cover: Requisitos
Una **comunidad energética** está compuesta por un **nombre único, una descripción y unas coordenadas GPS** (latitud, longitud). Y está relacionada con un **único gestor**.

Para **inscribirse** a una comunidad se pide obligatoriamente un código de **documento de identidad, el nombre del miembro y las coordenadas GPS donde están instalado el recurso distribuido (DER) y un nombre para el DER.** Además existe un campo opcional para los apellidos.