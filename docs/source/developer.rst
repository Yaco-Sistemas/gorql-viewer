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
(http://nodejs.org/dist/v0.6.15/node-v0.6.15.tar.gz) y luego se ejecutan los
siguientes comandos:

.. code-block:: bash

    tar xvf node-v0.6.15.tar.gz
    cd node-v0.6.15
    ./configure
    make
    sudo make install

En la documentación de node se pueden encontrar más detalles:
https://github.com/joyent/node/wiki/Installation

NPM es el manejador de paquetes de node, y es necesario para el despliegue,
pero no es necesario instalarlo porque ya viene incluido en NodeJS.

Despliegue de GORQL Viewer
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

GORQL Viewer estará disponible en http://localhost:3000/ igual que sin la
depuración activada.

Embebido de informes
====================

Es posible embeber informes y gráficos en otras páginas. Lo que se embebe es
el gráfico y la tabla con los datos, aunque es posible ocultarlos si sólo
se desea mostrar uno de los dos.

Al embeber un informe se realiza una petición a GORQL Viewer con la
consulta deseada para obtener los resultados. La generación de la tabla con los
datos, o del gráfico, se hace en el cliente mediante JavaScript.

Carga de dependencias
---------------------

Es necesario cargar las librerías JavaScript que generan los informes. Se
distribuyen en diferentes paquetes de manera que se puedan cargar únicamente
las librerías necesarias. Aunque también se distribuye un paquete con todo el
código necesario por si se prefiere esa opción.

El fichero que contiene todo el código, y por lo tanto es suficiente para
generar cualquier tipo de gráfico, es ``dv.min.js``. Con lo que añadiendo el
siguiente tag no sería necesario cargar ningún otro JavaScript:

.. code-block:: html

    <script type="text/javascript" src="http://example.com/javascripts/dv.min.js"></script>

Dicho fichero es bastante pesado, por ello se distribuyen las librerías
divididas en módulos de forma que no sea necesario cargarlo todo, si no sólo
las necesarias según el tipo de gráfico:

 - Gráficos *bar*, *pie* y *line*

   - ``dv-core`` y ``dv-d3``

 - Gráfico *timeline*

   - ``dv-core`` y ``dv-timeline``

 - Gráfico *map*

   - ``dv-core`` y ``dv-openlayers``

 - Gráfico *mapea*

   - ``dv-core`` y ``dv-mapea``

Es decir, ``dv-core`` es obligatoria sea cual sea el tipo de gráfico a generar.
Y luego es necesario cargar el paquete correspondiente a la familia a la que
pertenece el gráfico.

Estos paquetes son compatibles entre sí, es decir, que se pueden cargar varios
sin que haya conflictos. Por ejemplo, si se desea un gráfico de tipo *bar* y
otro de tipo *map* sólo habría que cargar ``dv-core``, ``dv-d3`` y
``dv-openlayers``. No es necesario cargar ``dv-core`` dos veces, ni cargar
``dv-timeline``.

Los tags serían, para cada librería:

.. code-block:: html

    <script type="text/javascript" src="http://example.com/javascripts/dv-core.js"></script>
    <script type="text/javascript" src="http://example.com/javascripts/dv-d3.js"></script>
    <script type="text/javascript" src="http://example.com/javascripts/dv-time.js"></script>
    <script type="text/javascript" src="http://example.com/javascripts/dv-openlayers.js"></script>
    <script type="text/javascript" src="http://example.com/javascripts/dv-mapea.js"></script>

Para el caso del gráfico de tipo *timeline* hay que añadir un tag extra en la
cabecera de la página (tag ``head``) **antes de cargar las librerías
JavaScript**, es decir, antes de los tags anteriores:

.. code-block:: html

    <script type="text/javascript">
        var Timeline_ajax_url="http://example.com/javascripts/timeline_ajax/simile-ajax-api.js",
            Timeline_urlPrefix='http://example.com/javascripts/timeline_js/',
            Timeline_parameters='bundle=true&defaultLocale="es"';
    </script>

También es necesario cargar la CSS base y las correspondientes a los gráficos
que se quieran utilizar. Es posible personalizar el aspecto de los gráficos
generados simplemente sustituyendo las hojas de estilo por unas personalizadas.

.. code-block:: html

    <link rel="stylesheet" href="http://example.com/stylesheets/style.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/bar.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/pie.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/line.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/timeline.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/map.css" />
    <link rel="stylesheet" href="http://example.com/stylesheets/mapea.css" />

Para el caso particular de los gráficos de tipo *map* es necesario cargar una
hoja de estilo más. Dicha CSS es la de OpenLayers y se cargaría añadiendo la
siguiente línea **antes de la inclusión de map.css**.

.. code-block:: html

    <link rel="stylesheet" href="http://example.com/javascripts/theme/default/style.css" />

Estas líneas se deben incluir en la cabecera, en la etiqueta ``head`` de la
página.

Inclusión de un informe concreto
--------------------------------

Para incluir un informe concreto hay que añadir una etiqueta ``script``
con la url específica del informe, es decir, la consulta SPARQL correspondiente.
También es necesaria una segunda etiqueta ``script`` con el código de
inicialización.

Además hay que añadir a la página dos nodos que se utlizarán como *viewports*
donde se escribirán los resultados de la consulta y se pintará la gráfica.

Ejemplo de embebido de un informe, incluye todos los nodos necesarios:

.. code-block:: html

    <script type="text/javascript" src="http://example.com/viewer/?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20PREFIX%20type%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2F%3E%20PREFIX%20prop%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%20SELECT%20%3Fcountry_name%20%3Fpopulation%20WHERE%20{%20%3Fcountry%20a%20type%3ALandlockedCountries%20%3B%20rdfs%3Alabel%20%3Fcountry_name%20%3B%20prop%3ApopulationEstimate%20%3Fpopulation%20.%20FILTER%20%28%3Fpopulation%20%3E%2010000000%20%26%26%20langMatches%28lang%28%3Fcountry_name%29%2C%20%22ES%22%29%29%20.%20}&amp;embedded=true&amp;idx=0"></script>
    <script type="text/javascript">
        DomReady.ready(function () {
            DV.writeDataToTable(Sizzle("#dv_table0")[0], 0);
            DV.pie("#dv_viewport0", "#dv_table0", {
                labels: "country_name",
                series: "population",
                sizeX: "600",
                sizeY: "400",
                sizeHighlight: "30"
            });
        });
    </script>
    <noscript><a href="http://example.com/viewer/?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20PREFIX%20type%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2F%3E%20PREFIX%20prop%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%20SELECT%20%3Fcountry_name%20%3Fpopulation%20WHERE%20{%20%3Fcountry%20a%20type%3ALandlockedCountries%20%3B%20rdfs%3Alabel%20%3Fcountry_name%20%3B%20prop%3ApopulationEstimate%20%3Fpopulation%20.%20FILTER%20%28%3Fpopulation%20%3E%2010000000%20%26%26%20langMatches%28lang%28%3Fcountry_name%29%2C%20%22ES%22%29%29%20.%20}">Ver resultados en el visor</a></noscript>
    <div id="dv_viewport0" class="dv_viewport"></div>
    <table id="dv_table0" class="dv_table"></table>

En total son dos etiquetas ``script``, una ``noscript``, una ``div`` donde se
dibujará el gráfico, y una ``table`` donde se escribirán los datos devueltos
por la consulta.

La primera etiqueta ``script`` se utiliza para obtener los datos devueltos por
la consulta. El ``src`` de la etiqueta es la url al visor con la consulta
deseada. Los parámetros de la url son:

- **query**: Consulta SPARQL a realizar.
- **embedded**: Valor boolean que debe estár a ``true`` para indicar que se
  trata de un informe embebido.
- **idx**: Índice de informe embebido dentro de la página. Cada gráfico que se
  embeba en la misma página debe tener su propio índice.

La siguiente etiqueta ``script`` contiene el código de inicialización que se
encarga de llamar a la librería para escribir la tabla y dibujar el gráfico.

El código de incialización se debe ejecutar una vez que la página está cargada,
para ello se provee de la utilidad DomReady_ en la librería ``dv-core.js``.
La manera de utilizarlo es:

.. _DomReady: http://code.google.com/p/domready/

.. code-block:: javascript

    DomReady.ready(function () {
        // Código de inicialización
    });

No es obligatorio utilizar esta utilidad, es posible usar cualquier librería
que asegure que el código se ejecutará cuando se haya cargado el DOM de la
página.

La primera línea del código de inicialización se encarga de escribir los datos
devueltos por la consulta en la etiqueta ``table`` dispuesta para ello. Este
paso es imprescindible porque el gráfico lee los datos de dicha tabla.

Si no se quiere mostrar la tabla tan sólo hay que añadir un ``display: none``
al estilo de la misma:

.. code-block:: html

    <table id="dv_table0" class="dv_table" style="display: none;"></table>

La invocación de la función que escribe los datos es:

.. code-block:: javascript

    DV.writeDataToTable(Sizzle("#dv_table0")[0], 0);

Necesita dos parámetros:

- El nodo de la tabla donde se escribirán los datos.
- El índice del informe utilizado en la consulta.

La librería ``dv-core.js`` incluye Sizzle_, un selector CSS que puede
utilizarse para obtener el nodo DOM de la tabla. Una vez más, no es
imprescindible utilizar está utilidad, cualquier otra forma de obtener el
nodo DOM de la tabla es válida.

.. _Sizzle: http://sizzlejs.com/

En el caso de que se trate de los gráficos *map* o *mapea* hay que realizar una
llamada extra de inicialización, antes de llamar a la función que se encarga de
generar el gráfico deseado.

Esta llamada se encarga de inicializar las librerías utilizadas para generar el
gráfico, y reciben un único parámetro, el ``host`` donde se encuentra GORQL
Viewer.

Para el caso del gráfico de tipo *map*:

.. code-block:: javascript

    DV.initMap('http://example.com');

Para el caso del gráfico de tipo *mapea*:

.. code-block:: javascript

    DV.initMapea('http://example.com');

El código quedaría tal que así para un gráfico de tipo *map*:

.. code-block:: html

    <script type="text/javascript">
        DomReady.ready(function () {
            DV.initMap('|example_domain|');
            DV.writeDataToTable(Sizzle("#dv_table0")[0], 0);
            DV.map("#dv_viewport0", "#dv_table0", {
                description: "name",
                lat: "lat",
                long: "long"
            });
        });
    </script>

La siguiente llamada es la que se encarga de generar el gráfico deseado. Hay
una función por cada tipo de gráfico soportado:

- **bar**: Gráficos de barras.
- **line**: Gráficos de líneas y áreas.
- **pie**: Gráficos de sectores.
- **timeline**: Línea del tiempo.
- **map**: Mapa del mundo.
- **mapea**: Mapas de Andalucía.

Aceptan tres parámetros:

- El identificador del nodo DOM donde se debe pintar el gráfico.
- El identificador del nodo DOM de tipo tabla con los datos.
- Un objeto con las opciones del gráfico. Para ver la API consulte el
  :doc:`user`. Los nombres de las propiedades del objeto de opciones y los
  valores de éstas, coinciden con los parámetros de la mencionada API.

.. note::

    Según el tipo de gráfico las propiedades del objeto de opciones pasado
    serán unas u otras. Al igual que en la API descrita en el :doc:`user` no
    todos los parámetros son obligatorios, se puede consultar dicha API para
    saber cuáles son opcionales.

.. code-block:: javascript

    DV.pie("#dv_viewport0", "#dv_table0", {
        labels: "country_name",
        series: "population",
        sizeX: "600",
        sizeY: "400"
    });

Para el caso particular del gráfico *mapea* es necesario pasarle un parámetro
más de los que se describen en la mencionada API. Dicho parámetro es
**encoded_query** y su valor debe ser la consulta SPARQL convenientemente
codificada para url.

La etiqueta ``noscript`` es necesaria para proveer de un mecanismo de *fallback*
para los casos en los que el usuario no dispone de JavaScript en su navegador.

Debe estár a continuación de la etiqueta script con el código de inicialización
del informe y contener un enlace a GORQL Viewer con la consulta en SPARQL, y
ningún parámetro más. Al usuario que acceda sin capacidad de JavaScript se le
mostrará este enlace, y podrá así acceder a los resultados de la consulta.

Generación de los paquetes RPM
==============================

Lo primero es obtener el código del repositorio mercurial:

.. code-block:: bash

    hg clone https://hg.yaco.es/ceic-ogov-data-viewer

Una vez que se haya terminado de clonar el proyecto se puede proceder a la
generación de los RPM.

.. note::

    Para poder generar los RPM es necesario que estén instalados en el sistema
    *mercurial* y *rpm-build*

NodeJS
------

Dependencias
~~~~~~~~~~~~

Es necesario que estén instaladas las herramientas de compilación y algunas
librerías. Se pueden instalar mediante el sistema de paquetería del sistema
operativo:

.. code-block:: bash

    yum install gcc gcc-c++ make openssl-devel libstdc++-devel

Hay que descargar también el código fuente de NodeJS_ de la web, la versión
0.6.15 se encuentra disponible aquí_.

.. _NodeJS: http://nodejs.org/

.. _aquí: http://nodejs.org/dist/v0.6.15/node-v0.6.15.tar.gz

Generación
~~~~~~~~~~

Para generar el paquete hay que copiar el **spec** y el **tar.gz** a los
correspondientes directorios de generación:

.. code-block:: bash

    cp ceic-ogov-data-viewer/specs/nodejs.spec /usr/src/redhat/SPECS/
    cp node-v0.6.15.tar.gz /usr/src/redhat/SOURCES/

Con esto queda preparada la generación del paquete, para ello sólo hay que
ejecutar los siguientes comandos:

.. code-block:: bash

    cd /usr/src/redhat/SPECS/
    rpmbuild -ba nodejs.spec

Cuando termine el proceso se habrá generado el paquete RPM, que estará
disponible en */usr/src/redhat/RPMS/x86_64/nodejs-0.6.15-1.el6.x86_64.rpm*

GORQL Viewer
------------

Dependencias
~~~~~~~~~~~~

La generación del paquete RPM de GORQL Viewer requiere que esté instalado el
paquete de NodeJS generado en el apartado anterior:

.. code-block:: bash

    rpm -Uvh nodejs-0.6.15-1.el6.x86_64.rpmbuild

También requiere de la utilidad *make*, que se puede instalar mediante el
sistema de paquetería del sistema operativo:

.. code-block:: bash

    yum install make

Generación
~~~~~~~~~~

Lo primero es editar el fichero *ceic-ogov-data-viewer/specs/gorql-viewer.spec*
del visor y modificar la versión del paquete a la deseada, se trata de la
línea que comienza con **Version:**.

Luego hay que comprimir los fuentes en un **tar.gz**. Para ello hay que
ejecutar los siguientes comandos, **sustituyendo VERSION por la versión
especificada en el fichero .spec**:

.. code-block:: bash

    cd ceic-ogov-data-viewer
    hg archive -t tgz gorql-viewer-VERSION.tar.gz

Para generar el paquete hay que copiar el **spec** y el **tar.gz** a los
correspondientes directorios de generación:

.. code-block:: bash

    cp ceic-ogov-data-viewer/specs/gorql-viewer.spec /usr/src/redhat/SPECS/
    cp ceic-ogov-data-viewer/gorql-viewer-VERSION.tar.gz /usr/src/redhat/SOURCES/

Con esto queda preparada la generación del paquete, para ello sólo hay que
ejecutar los siguientes comandos:

.. code-block:: bash

    npm cache clean
    cd /usr/src/redhat/SPECS/
    rpmbuild -ba gorql-viewer.spec

Cuando termine el proceso se habrá generado el paquete RPM, que estará
disponible en */usr/src/redhat/RPMS/x86_64/gorql-viewer-VERSION-1.x86_64.rpm*

.. note::

    Cuando se producen errores en la generación de un RPM es habitual que
    queden restos en los directorios temporales que hay que borrar antes de
    volver a intentar la generación de dicho RPM. Los directorios a limpiar
    son:

        - /usr/src/redhat/BUILD
        - /usr/src/redhat/BUILDROOT
        - /var/tmp
        - /opt/gorql-viewer
