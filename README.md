GORQL Viewer
============

GORQL Viewer es el primer componente del sistema GORQL. Su objetivo es generar
informes a partir de un endpoint SPARQL y un conjunto de parámetros. Los
informes que genera GORQL Viewer están formados por una visualización gráfica
y una tabla de datos, siendo ambas partes opcionales. Numerosos tipos de
visualizaciones están soportados.

GORQL Viewer se distribuye con licenica EUPL o Licencia Pública de la Unión
Europea. Esta licencia es una de las licencias aceptadas como software libre
por la FSF (Free Software Foundation).

Puede consultar el manual de despliegue, el manual de usuario y el manual de
desarrollador en la documentación ubicada en el directorio docs.

# GORQL Viewer

GORQL Viewer shows the results of a SPARQL query in a rich way, with tabular
data and interactive graphics. The generated reports can be embedded in any
webpage.

Site: www.gorql.com

## Requirements

[Node.js](http://www.nodejs.org/) 0.6.17 or higher, it works fine with node.js
0.8.x too. The rpms specs are hardwired to the 0.8.14 version, though.

Dependencies are listed in the *package.json* file, and can be installed using
[npm](https://npmjs.org/).

## Development deployment

```bash
git clone git://github.com/Yaco-Sistemas/gorql-viewer.git
cd gorql-viewer
npm install -d
cd public/javascripts/
make all
cd ../../
node --debug app.js
```

And now you can open [http://localhost:3000/](http://localhost:3000/) in your
favourite browser :)

## Documentation

There is some documentation in **spanish** in the **docs** folder, it's built
with [Sphinx](http://sphinx-doc.org/) so you will need it to generate the
output files.

## License

Copyright 2012 Yaco Sistemas S.L.

Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the
European Commission - subsequent versions of the EUPL (the "Licence"). You may
not use this work except in compliance with the Licence. You may obtain a copy
of the Licence at:

http://joinup.ec.europa.eu/software/page/eupl

Unless required by applicable law or agreed to in writing, software distributed
under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the Licence for the
specific language governing permissions and limitations under the Licence.