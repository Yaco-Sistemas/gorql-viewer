====================
Manual de despliegue
====================

Consideraciones generales
=========================

Mauris pellentesque posuere augue, at dignissim erat iaculis vel. Cras nisl
justo, pretium ac rhoncus non, viverra a purus. Mauris vel luctus erat. Aliquam
egestas rhoncus tellus, posuere luctus arcu volutpat venenatis. Donec id
faucibus tortor. Morbi felis libero, placerat in luctus sit amet, vestibulum in
arcu. Aliquam rutrum euismod massa a venenatis. Proin vulputate adipiscing
ultrices. Fusce sed nibh leo. Nam id odio lorem, pretium convallis lorem.
Phasellus leo orci, lobortis vel egestas nec, sollicitudin quis nunc. Cras
consequat elit id diam varius vitae pretium nisi fermentum. Vivamus justo
sapien, lacinia vel eleifend at, eleifend ut lacus. Aliquam ac nisi a est tempor
faucibus at ac turpis. Vestibulum sodales scelerisque libero, molestie congue
neque eleifend ut.

In cursus mauris feugiat dui fermentum luctus. Sed ullamcorper aliquet urna sit
amet adipiscing. Integer sagittis tellus orci. Aenean euismod pulvinar tellus id
convallis. Quisque cursus quam ante, in egestas sem. Donec fermentum, augue sit
amet tincidunt cursus, turpis arcu luctus leo, ut congue arcu orci a velit.
Integer feugiat erat sit amet arcu varius aliquet. Suspendisse potenti. Integer
orci metus, luctus ut rhoncus a, dapibus ut mauris. Phasellus imperdiet leo ac
sem interdum quis adipiscing orci euismod. Morbi adipiscing rhoncus enim ac
accumsan. Vestibulum cursus mi eget nisi elementum vel adipiscing tortor
interdum.

Entorno de desarrollo
=====================

El proceso detallado para desplegar el visor de colecciones para un entorno
de desarrollo se encuentra en el :doc:`developer`.

Dependencias
============

El visor de colecciones no tiene ninguna dependencia especial más allá de
NodeJS, del que se proporciona también un paquete para su instalación.

NodeJS
======

NodeJS es la tecnología sobre la que se ha construido el visor de colecciones.
Se puede instalar a partir de un RPM:

*x86_64*
 Descarga-NodeJS_

.. _Descarga-NodeJS: http://files.yaco.es/~ceic-ogov/nodejs-0.6.7-1.el6.x86_64.rpm

Una vez descargado el paquete se instala ejecutando:

.. code-block:: bash

 $ rpm -Uvh nodejs-0.6.7-1.el6.x86_64.rpm

Este paquete provee NodeJS_ y NPM_ (el sistema de paquetería de NodeJS),
necesarios para el funcionamiento del visor de colecciones.

.. _NodeJS: http://nodejs.org/
.. _NPM: http://npmjs.org/

Data Viewer
===========

Una vez instalado NodeJS, se puede desplegar el visor. Para ello se utiliza el
paquete RPM:

*x86_64*
 Descarga-DataViewer_

.. _Descarga-DataViewer: http://files.yaco.es/~ceic-ogov/dataviewer-0.0.1-1.x86_64.rpm

Una vez descargado el paquete se instala ejecutando:

.. code-block:: bash

 $ rpm -Uvh dataviewer-0.0.1-1.x86_64.rpm

Este paquete incluye el visor y todas las librerías que utiliza, y crea un
script de servicio para el arranque del servidor.

Los contenidos del paquete se despliegan en `/opt/dataviewer/`. Los logs se
encuentran en `/opt/dataviewer/.forever/`.

Gestión del servicio
--------------------

Gracias al script de servicio *dataviewer* es muy sencillo gestionar el
**arranque**, **parada** y **monitorización** del servidor. Para ello tan sólo
hemos de invocar al servicio con el argumento *start*, *stop* o *status*,
respectivamente.

*Ejemplos de salida*

.. code-block:: bash

 # service dataviewer start
 info:   Forever processing file: /opt/dataviewer/app.js

.. code-block:: bash

 # service dataviewer stop
 info:   Forever stopped process:
 data:       uid  command script                 forever pid  logfile                           uptime
 data:   [0] ekL8 node    /opt/dataviewer/app.js 8101    8102 /opt/dataviewer/.forever/ekL8.log 0:0:40:0.5

.. code-block:: bash

 # service dataviewer status
 info:   Forever processes running
 data:       uid  command script                 forever pid  logfile                           uptime
 data:   [0] ekL8 node    /opt/dataviewer/app.js 8101    8102 /opt/dataviewer/.forever/ekL8.log 0:0:39:15.924
