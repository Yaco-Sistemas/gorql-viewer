==================
Manual del usuario
==================

Cómo hacer consultas
====================

Las consultas se deben realizar a la url http://dominio_visor/viewer/ y a
continuación se añaden los parámetros en formato GET.

 - **query**
   Consulta en SPARQL codificada para urls. *Obligatorio*.
 - **embedded**
   Valor booleano que determina si se deben devolver los datos en formato JSON
   en lugar de mostrar el visor. *Opcional*.
 - **chart**
   Tipo de gráfico a generar. *Opcional*. Puede valer:

   - bar
   - pie

Parámetros de los gráficos
--------------------------

Los siguientes parámetros son para configurar el gráfico a generar, por lo que
si el parámetro *chart* no está presente no hay que utilizar ninguno de estos:

 - **labels**
   Propiedad seleccionada en la consulta SPARQL que se usará como etiqueta en
   el gráfico. *Obligatorio*.
 - **series**
   Lista separada por comas de propiedades seleccionadas por la consulta
   SPARQL que se usaran como datos en el gráfico. Deben ser valores numéricos.
   La lista puede contener un único nombre de propiedad, la coma no es
   necesaria en ese caso. *Obligatorio*.
 - **sizeX**
   Tamaño en píxeles que tendrá de ancho el gráfico generado. *Opcional*.
 - **sizeY**
   Tamaño en píxeles que tendrá de alto el gráfico generado. *Opcional*.
 - **sizeLabel**
   Tamaño en píxeles que se reservará del total para pintar las etiquetas en el
   gráfico. *Opcional*.

A continuación siguen parámetros específicos de algunos tipos de gráficos.

Barras
~~~~~~

 - **landscape**
   Valor booleano que determina si las barras se pintarán en horizontal.
   *Opcional*.

Ejemplos
--------

Consulta que pinta un gráfico de sectores (*pie*) de 700 píxeles de ancho::

    http://dominio_visor/viewer/?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20PREFIX%20type%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2F%3E%20PREFIX%20prop%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%20SELECT%20%3Fcountry_name%20%3Fpopulation%20WHERE%20%7B%20%3Fcountry%20a%20type%3ALandlockedCountries%20%3B%20rdfs%3Alabel%20%3Fcountry_name%20%3B%20prop%3ApopulationEstimate%20%3Fpopulation%20.%20FILTER%20(%3Fpopulation%20%3E%2015000000%20%26%26%20langMatches(lang(%3Fcountry_name)%2C%20%22ES%22))%20.%20%7D&chart=pie&labels=country_name&series=population&sizeX=700

Además de la consulta SPARQL se le pasan los siguientes parámetros para dibujar
el gráfico de sectores::

    chart=pie&labels=country_name&series=population&sizeX=700
