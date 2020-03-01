# TODO.md

[x] templates/Store.ejs
  [x] Añadírselo a Model.js como opción configurable por instancia.
  [x] Añadir métodos:
    [x] store.getPath
    [x] store.describe
    [x] store.has
    [x] store.hasFile
    [x] store.read
    [x] store.write
    [x] store.delete
    [x] store.hasFolder
    [x] store.readFolder
    [x] store.createFolder
    [x] store.deleteFolder
    [x] store.readStream
    [x] store.writeStream


[ ] templates/Model.ejs:
  [ ] Adjuntar parametrizable "store" con una instancia del Store por defecto.
  [ ] Separar "onReturnData" del ciclo de todos los CRUD.
  [ ] Añadir ciclo "onFileSynchronization" en métodos:
    [ ] postOne
    [ ] putOne
    [ ] deleteOne
  [ ] Permitir parámetro (de extensión) "$fileSettings" a cualquier columna:
    [ ] Un objeto al que se le puede asignar una ruta.
  [ ] Permitir parámetro "$files" en métodos:
    [ ] postOne
    [ ] putOne
  [ ] Permitir a "$files: { 'field': {...} }" aceptar:
    [ ] contenidos en utf8
    [ ] contenidos en binario
    [ ] contenidos en streams
    [ ] contenidos en ruta a fichero