# TODO.md

[ ] templates/Store.ejs
  [x] Añadírselo a Model.js como opción configurable por instancia.
  [ ] Añadir métodos:
    [ ] store.getPath
    [ ] store.describe
    [ ] store.has
    [ ] store.hasFile
    [ ] store.read
    [ ] store.write
    [ ] store.delete
    [ ] store.hasFolder
    [ ] store.readFolder
    [ ] store.createFolder
    [ ] store.deleteFolder
    [ ] store.readStream
    [ ] store.writeStream


[ ] templates/Model.ejs:
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
  [ ] 