1.4.0
=====

Lista de cambios
----------------

- Nuevas versiones de las dependencias, soporte de nodejs 0.8.X.
- Mensaje informativo cuando no hay resultados.
- Soporte de un párametro más en la url que define cabeceras legibles y
  amigables para la tabla de resultados.
- Autogeneración del código de embebido de informes.

1.3.0
=====

Lista de cambios
----------------

- Soporte de chkconfig.
- Documentación para la actualización.

1.2.0
=====

Lista de cambios
----------------

- Nuevas cabecera y pie, con el logo del visor. El logo y título mostrados en
  la cabecera son personalizables.
- Extraído forever a un paquete rpm externo.
- El tamaño requerido para las etiquetas se calcula ahora dinámicamente en los
  gráficos basados en d3.

1.1.1
=====

Lista de cambios
----------------

- Soporte de la nueva versión de NodeJS, 0.6.17. La versión anterior tiene un
  bug de seguridad.

1.1.0
=====

Lista de cambios
----------------

- Soporte de la versión 2.9.1 de d3, que incluye soporte de NodeJS en el lado
  del servidor.
- Adaptación de los paquetes RPM a RH5.

1.0.1
=====

Lista de cambios
----------------

- Nuevo setting para establecer el dominio en el que se sirve la aplicación. Se
  utiliza para inicializar los gráficos de mapas.

1.0.0
=====

Lista de funcionalidades
------------------------

- Fácilmente escalable.
- Servidor SPARQL configurable.
- Parámetros por defecto configurables para los gráficos.
- Soporte de memcache para almacenar los resultados de las consultas SPARQL.
- Visualización de resultados como tabla.
- Gráficos interactivos a partir de los resultados:

  - Barras
  - Líneas
  - Sectores (Tarta)
  - Línea de tiempo
  - Mapas (Open Street Maps)
  - Mapas (Mapea)

- Soporte de navegadores antiguos mediante imágenes de los gráficos más
  complejos.
- Temas para los gráficos mediante CSS.
- Embebido de la vista de resultados en otras páginas.
- Generación de empaquetados minimizados personalizados de las librerías
  JavaScript para embebido.
