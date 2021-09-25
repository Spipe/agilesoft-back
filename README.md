# agilesoft-back

# problema
Se requiere desarrollar una API Rest para un sistema TODO List con las siguientes funcionalidades:
- Inscribir un usuarios
-  Login
-  Obtener datos usuario a partir de sesión
-  Obtener listado de tareas del usuario y su estado
- Agregar tarea asociada al usuario
- Marcar como resuelta una tarea de un usuario
- Eliminar una tarea de un usuario

Los datos del usuario son:
- Username
- Password (usar un método de cifrado para almacenar password)
- Nombre

Los datos de las tareas de un usuario son:
- Nombre
- Estado (No Resuelto / Resuelto)
- Descripción
- fecha creación
- fecha última actualización

# Solucion
## Framework y Lenguajes
- Javascript
- Express
- Jest

## Installation

Se requiere [Node.js](https://nodejs.org/)

```sh
npm i
```

## scripts

```
npm run dev
npm run test
npm run test:watch
```

## Endpoints
/api/create/user
METHOD POST
request
```
{
    "username":"agilesoft3",
    "password":"agile1235",
    "nombre" : "felipe4"
}
```
respond
```
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI2MDQ1NjYsImV4cCI6MTYzMjY5MDk2Nn0.X6mxQUwpK371e9PMve2KcL1S494af-4x0eup06gZADA"
}
```
