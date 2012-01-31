====================
Manual de despliegue
====================

Consideraciones generales
=========================

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo turpis,
varius sed iaculis quis, dignissim vel lacus. Suspendisse lobortis neque
eleifend quam semper et malesuada eros pretium. Suspendisse potenti. Fusce
mattis tellus et tellus cursus ac rutrum libero porta. Suspendisse eget gravida
est. In faucibus enim vel erat rutrum in tincidunt urna aliquet. Pellentesque
porta sollicitudin libero, sed pharetra metus vehicula id.

Entorno de desarrollo
=====================

El proceso detallado para desplegar el visor de colecciones para un entorno
de desarrollo se encuentra en el :doc:`developer`.

Dependencias
============

NodeJS
------

NodeJS es necesario para la ejecución del visor. Se provee de un paquete RPM
para su instalación, el proceso se detalla en el siguiente apartado.

ImageMagick
-----------

ImageMagick se utiliza para la generación de imágenes png de los gráficos en
el servidor. No se provee RPM, pero está disponible en el repositorio. Se
puede instalar haciendo uso de yum:

::

 # yum install ImageMagick

Memcached
---------

Memcached es un servidor de cache y, aunque no es una dependencia obligatoria,
sí que es muy recomendable. Si Memcached está instalado y corriendo, el visor
hará uso de la caché para minimizar las peticiones al endpoint SparQL agilizando
mucho el funcionamiento.

No se provee RPM, pero está disponible en el repositorio. Se
puede instalar haciendo uso de yum:

::

 # yum install memcached

Otros
-----

Las librerías que requiere el visor se distribuyen en el paquete del mismo, con
lo que al instalar el visor se instalan también sus dependencias.

NodeJS
======

NodeJS es la tecnología sobre la que se ha construido el visor de colecciones.
Se puede instalar a partir de un RPM:

*x86_64*
 Descarga-NodeJS_

.. _Descarga-NodeJS: http://files.yaco.es/~ceic-ogov/nodejs-0.6.7-1.el6.x86_64.rpm

Una vez descargado el paquete se instala ejecutando:

::

 # rpm -Uvh nodejs-0.6.7-1.el6.x86_64.rpm

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

::

 # rpm -Uvh dataviewer-0.0.1-1.x86_64.rpm

Este paquete incluye el visor y todas las librerías que utiliza, y crea un
script de servicio para el arranque del servidor.

Los contenidos del paquete se despliegan en `/opt/dataviewer/`. Los logs se
encuentran en `/opt/dataviewer/.forever/`.

El servidor escucha, con la configuración por defecto, en el **puerto 3000**.
La configuración del mismo se encuentra en el fichero `settings.js` en el
directorio `/etc/dataviewer/`.

Gestión del servicio
--------------------

Gracias al script de servicio *dataviewer* es muy sencillo gestionar el
**arranque**, **parada** y **monitorización** del servidor. Para ello tan sólo
hemos de invocar al servicio con el argumento *start*, *stop* o *status*,
respectivamente.

Para la gestión de este servicio se utiliza Forever_ que se encarga de que el
servidor se relance en caso de que ocurra algún problema.

.. _Forever: https://github.com/nodejitsu/forever

*Ejemplos de salida*

::

 # service dataviewer start
 info:   Forever processing file: /opt/dataviewer/app.js

::

 # service dataviewer stop
 info:   Forever stopped process:
 data:       uid  command script                 forever pid  logfile                           uptime
 data:   [0] ekL8 node    /opt/dataviewer/app.js 8101    8102 /opt/dataviewer/.forever/ekL8.log 0:0:40:0.5

::

 # service dataviewer status
 info:   Forever processes running
 data:       uid  command script                 forever pid  logfile                           uptime
 data:   [0] ekL8 node    /opt/dataviewer/app.js 8101    8102 /opt/dataviewer/.forever/ekL8.log 0:0:39:15.924

Configuración
-------------

La configuración del visor se encuentra en el directorio `/etc/dataviewer/`.

settings.js
~~~~~~~~~~~

Éste es el fichero principal de configuración del visor de colecciones. Incluye
tres grupos de parámetros: *global*, *development* y *production*. Que son
opciones globales para todos los casos, específicas para entornos de desarrollo,
y específicas para entornos de producción, respectivamente.

El formato es JSON. Las opciones de desarrollo y producción son las mismas, se
utiliza un grupo u otro según se arranque el visor en un modo u otro.

El fichero trae una configuración de ejemplo.

Global
''''''

 - **port**: Puerto en el que escucha el visor

Development y Production
''''''''''''''''''''''''

 - **sparqlEndpoint**: Url del servidor al que se le realizan las consultas en
   SparQL.
 - **memcachedServer**: Url del servidor memcached, incluye el puerto.
 - **memcachedLifetime**: Tiempo en segundos que memcached mantiene los datos.
 - **bar**:

   - **sizeX**: Ancho en píxeles del gráfico.
   - **sizeY**: Alto en píxeles del gráfico.
   - **sizeLabel**: Espacio en píxeles reservado para las etiquetas en el gráfico.
   - **landscape**: Valor booleano que determina si el gráfico se debe representar
     en horizontal.

 - **pie**:

   - **sizeX**: Ancho en píxeles del gráfico.
   - **sizeY**: Alto en píxeles del gráfico.
   - **sizeLabel**: Espacio en píxeles reservado para las etiquetas en el gráfico.
   - **sizeHighlight**: Número de píxeles que se desplaza hacia afuera un sector
     al ser resaltado con el cursor.

 - **line**:

   - **sizeX**: Ancho en píxeles del gráfico.
   - **sizeY**: Alto en píxeles del gráfico.
   - **sizeLabel**: Espacio en píxeles reservado para las etiquetas en el gráfico.
   - **area**: Valor booleano que determina si el área comprendida debajo de las
     líneas se debe colorear.

 - **timeline**:

   - **sizeX**: Ancho en píxeles del gráfico.
   - **sizeY**: Alto en píxeles del gráfico.
   - **detailRes**: Resolución temporal de la banda con la vista detallada.
     :ref:`Posibles valores. <simile-chart>`
   - **overviewRes**: Resolución temporal de la banda con la vista resumen.
     :ref:`Posibles valores. <simile-chart>`

 - **map**:

   - **sizeX**: Ancho en píxeles del gráfico.
   - **sizeY**: Alto en píxeles del gráfico.
