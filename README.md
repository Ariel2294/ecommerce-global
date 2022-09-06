# E-Commerce Global API
# Requerimientos
- [Node.js](https://nodejs.org/es/download/) desarrollado en la versión LTS: ```v16.14.0```
- [Docker](https://docs.docker.com/get-docker/) Para pruebas locales y despliegue en la nube
- [Docker Compose](https://docs.docker.com/compose/install/) Orquestar nuestros contenedores en local simulando la instalación en la nube

- [MongoDB](https://www.mongodb.com/docs/) Se usa la base de datos MongoDB administrada con ```@nestjs/mongoose```

- [Redis](https://redis.io/docs/) Se usa redis para guardar información relevante para geolocalización y manejo de monedas


# Tecnologías
- [IP GEO API](https://getgeoapi.com/) Api extraer datos de geolocalización y conversión de divisas.


- [Wasabi](https://wasabi.com/) Servicio cloud para almacenamiento de imagenes o archivos.

- [Caprover](https://caprover.com/) PaaS para el despligue de aplicaciónes con docker.

## Descripción

Este proyecto está desarrollado en [Nest](https://github.com/nestjs/nest) framework con typescript.

## Iniciar el proyecto en desarrollo
## Installation

```bash
$ npm install
```

## Establecer variables de entorno en nuestro archivo .ENV
- Las variables de entorno para ejecutar pruebas exitosas se comparten en este archivo de [MEGA](https://mega.nz/file/wdBDxAab). La clave para descifrar el archivo se compartirá por correo electrónico.
## Ejecutar Docker

- Ejecuta el comando ```docker-compose up``` para correr los contenedores.


## Probar el proyecto en staging

## Documentación y URL staging

- El proyecto está desplegado en un servidor privado virtual, para acceder al servicios es en https://ecommerce.stg.arielclaros.com/ .


- Para acceder a la documentación https://ecommerce.stg.arielclaros.com/docs.



## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

# Tareas Finalizadas

- [X] Configuración del proyecto.
- [X] Implementación de base de datos MongoDB.
- [X] JWT para la autenticación de usurios.
- [X] Static Token para proteger la rutas públicas.
- [X] Coversión de divisa.
- [X] Geolocalización por dirección IP.
- [X] Estrategia de caché para manejo de datos de geolocalización y divisa.
- [X] Test unitarios.
- [X] Mocks de datos para test.
- [X] Integración de S3.
- [X] Calculo de precios segun geolocalización.
- [X] Despliegue continuo con caprover.
- [X] Manejo de timezone para fechas.
- [X] Sistema de logger con Winston.
- [X] Git action para el despligue el cambio de versión del proyecto en casa paso a develop.
- [X] Crud Productos.
- [X] Create y get all de Usuarios.
- [X] Get All de categorias, ciudades y paises.
- [X] Paginación de datos.
- [X] Documentación api con Swagger.
- [X] Configuración de pre-commit con husky.

# Tareas No Finalizadas

- [ ] Actualizar usuarios.
- [ ] Crud completo de ciudades y paises.
- [ ] Crud completo de categorias.
- [ ] Estrategia de monitoreo de logs en grafana con loki.
- [ ] Crud de reviews a productos.
- [ ] Mostrar productos ordenados por reviews.
- [ ] Implementación de google Analytics.
- [ ] Implementación de recaptcha.




# NOTAS
- La documentación se muestra en producción por ser con fines de prueba técnica.