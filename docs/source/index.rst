.. GORQL Viewer documentation master file, created by
   ablanco@yaco.es on Fri Dic 23 13:00:00 2011.

============
GORQL Viewer
============

:Author: `Yaco Sistemas S.L. <http://www.yaco.es/>`_
:Website: https://trac.yaco.es/ceic-ogov/
:Release: |release|

GORQL Viewer es el primer componente del sistema GORQL. Su objetivo es
generar informes a partir de un endpoint SPARQL y un conjunto de parámetros.
Los informes que genera GORQL Viewer están formados por una visualización
gráfica y una tabla de datos, siendo ambas partes opcionales. Numerosos
tipos de visualizaciones están soportados.

GORQL Viewer se distribuye con licencia `EUPL o Licencia Pública de
la Unión Europea <http://ec.europa.eu/idabc/eupl>`_. Esta licencia es una de
las licencias aceptadas como software libre por la `FSF (Free Software
Foundation) <http://www.fsf.org>`_.

Introducción
============

.. toctree::
   :maxdepth: 1

   intro

Manuales
========

.. toctree::
   :maxdepth: 1

   deployment
   user
   developer

Notas de publicación
====================

.. toctree::
   :maxdepth: 1

   releases

Cómo obtener GORQL Viewer
=========================

GORQL Viewer se distribuye en formato RPM y ha sido testeado en
sistemas RedHat EL 5.6. Los paquetes de cada uno de sus componentes están
disponibles en el
`siguiente servidor de Yaco <http://files.yaco.es/~ceic-ogov/>`_ de forma
provisional. Para más información sobre cómo instalar el visor de colecciones,
consulte el :doc:`deployment`.

Puede obtener las fuentes del proyecto utilizando un cliente Mercurial:

.. code-block:: bash

    hg clone http://hg.yaco.es/ceic-ogov-data-viewer
