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
    "username":"username",
    "password":"password",
    "nombre" : "felipe"
}
```
respond
```
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI2MDQ1NjYsImV4cCI6MTYzMjY5MDk2Nn0.X6mxQUwpK371e9PMve2KcL1S494af-4x0eup06gZADA"
}
```
/api/login

METHOD POST

request
```
headers:{
    "Authorization": "Bearer token"
}
body:{
    "username":"username",
    "password":"password"
}
```
respond
```
{
    "name": "name",
    "username": "username",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjMyNjA0NTk1LCJleHAiOjE2MzI2OTA5OTV9.dXdQFydcIUvWx7SKNdbWvx3z5J7OIzqu-rOT5ACD9lU"
}
```
/api/get/user

METHOD GET

request
```
headers:{
    "Authorization": "Bearer token"
}
```
respond
```
{
    "username": "username",
    "nombre": "nombre"
}
```
/api/create/task

METHOD POST

request
```
headers:{
    "Authorization": "Bearer token"
}
body:{
    "nombre" : "nombre",
    "estado" : false,
    "descripcion" : "descripcion"
}
```
respond
```
{
   "id":id
}
```
/api/get/tasks

METHOD GET

request
```
headers:{
    "Authorization": "Bearer token"
}
```
respond
```
[
    {
        "id": id,
        "nombre": "nombre",
        "estado": boolean,
        "fecha_actualizacion": datetime
    }
]
```
/api/update/task/:id

METHOD PUT

request
```
headers:{
    "Authorization": "Bearer token"
}
```
respond
```
{
    "message": "message"
}
```
/api/delete/task/:id

METHOD DELETE

request
```
headers:{
    "Authorization": "Bearer token"
}
```
respond
```
{
    "message": "message"
}
```


