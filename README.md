# TEP-Project

Este proyecto es una API desarrollada en Node.js con Express, TypeScript, MongoDB y documentación con Swagger.

## Requisitos Previos

Node.js (v18.17.0 o superior)
Docker (para ejecutar MongoDB en contenedor)
npm (gestor de paquetes)
MongoDB (o usar Docker para correrlo en un contenedor)

## Instalación
### 1. Clona el repositorio

Clona el repositorio a tu máquina local:

```bash
git clone https://github.com/tuusuario/TEP-Project.git
cd TEP-Project

### 2. Instalar dependencias 
npm install

### 3. Variables de entorno
Crea un archivo .env con:
PORT=3000
MONGO_URI=mongodb://localhost:27017/jokesdb

### 4. Levanta mongoDB con docker
docker run -d --name mongodb -p 27017:27017 mongo

### 5. Corre el proyecto
npm run dev



### Scripts disponibles
npm run dev
Inicia el servidor en modo de desarrollo con nodemon y ts-node. Esto permite ver los cambios automáticamente sin necesidad de reiniciar el servidor manualmente.

npm run build
Compila el proyecto TypeScript a JavaScript en el directorio dist.

npm run start
Inicia el servidor con los archivos compilados en dist/. Este comando debe ejecutarse después de ejecutar npm run build.

npm run test
Ejecuta los tests definidos en el proyecto utilizando jest.