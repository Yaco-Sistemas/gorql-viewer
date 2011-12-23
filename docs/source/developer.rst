========================
Manual del desarrollador
========================

Instalación del entorno de desarrollo
=====================================

Dependencias
------------

Es necesario tener instaladas las **utilidades de compilación** del sistema.
Para la función de cacheo de peticiones se hace uso de **memcache**, por lo que
si se desea usar la cache debe estar instalado y corriendo en el sistema.

También es muy recomendable tener instalado algún navegador basado en
**webkit**. Es imprescindible para depurar el servidor usando node-inspector.

Instalar NodeJS
---------------

Es necesario descargar y compilar node: http://nodejs.org/#download

Compilar NodeJS
~~~~~~~~~~~~~~~

Primero se descarga el último tar disponible
(http://nodejs.org/dist/v0.6.6/node-v0.6.6.tar.gz) y luego se ejecutan los
siguientes comandos:

.. code-block:: bash

    tar xvf node-v0.6.6.tar.gz
    cd node-v0.6.6
    ./configure
    make
    sudo make install

En la documentación de node se pueden encontrar más detalles:
https://github.com/joyent/node/wiki/Installation

Instalar NPM
~~~~~~~~~~~~

NPM es el manejador de paquetes de node, y es necesario para el despliegue.
Hay que instalarlo cómo **root** ejecutando:

.. code-block:: bash

    curl http://npmjs.org/install.sh | sh

Despliegue del Data Viewer
--------------------------

Lo primero es obtener el código del repositorio mercurial:

.. code-block:: bash

    hg clone https://hg.yaco.es/ceic-ogov-data-viewer

A continuación hay que instalar las dependencias del mismo, para ello se debe
ejecutar:

.. code-block:: bash

    cd ceic-ogov-data-viewer
    npm install -d

Por último se puede ajustar la configuración del visor editando el fichero
**settings.js**

Arranque del servidor
---------------------

Para arrancar el servidor basta con:

.. code-block:: bash

    node app.js

El servidor se lanzará y escuchará en: http://localhost:3000/

Depuración del visor
--------------------

Node-Inspector
~~~~~~~~~~~~~~

Para instalarlo en el sistema hay que ejecutar como **root**:

.. code-block:: bash

    npm install -g node-inspector

Arranque del servidor en modo debug
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Primero se debe lanzar node-inspector:

.. code-block:: bash

    node-inspector &

A continuación se puede arrancar el servidor en modo debug ejecutando:

.. code-block:: bash

    node --debug app.js

Accediendo a http://localhost:8080/debug?port=5858 con un navegador basado en
webkit se mostrarán las herramientas de depuración para depurar el servidor.

El visor estará disponible en http://localhost:3000/ igual que sin la
depuración activada.
