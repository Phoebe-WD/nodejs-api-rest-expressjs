# NodeJs API Rest con ExpressJs, Backend con Node.js: Base de Datos con PostgreSQL, Autenticación con PassportJs & JWT

### Pre Config

Instalamos los paquetes que usaremos

`npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D`

En nuestro package.json crearemos nuestros comandos:
```
  "scripts": {
    "dev": "nodemon app/server/index.js",
    "start": "node app/server/index.js",
    "lint": "eslint"
  },
```
Creamos los siguientes archivos:
- .editorconfig
- .eslintrc.json
- .gitignore

Configuramos nuestro Editor Config (se recomienda tener instalada la extension en el vscode igual)
```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.js]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

Configuramos nuestro Eslint Config (Se recomienda tener la extension Eslint instalada en el vscode)
```
{
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "extends": ["eslint:recommended", "prettier"],
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-console": "warn"
  }
}
```

El gitignore podemos sacar la configuración a través del siguiente [link](https://www.toptal.com/developers/gitignore/)

Para crear data falsa hay que instalar Faker

`npm i faker@5.5.3 -S`
#### Docus & Config

- [Express Doc](http://expressjs.com/)
- [Git Ignore Config](https://www.toptal.com/developers/gitignore/)
- [Extension JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh/related)
- [Faker Doc](https://www.npmjs.com/package/faker/v/5.5.3)


## ¿Qué es una RESTful API?

**REST: Representational State Transfer**

Es una conveccion que se refiere a servicios web por protocolo HTTP

Metodos:

- **Get:** Es el método que se utiliza para solicitar información, no deberia tener otros efectos a parte de recibir la data. Por ejemplo: Solicitarle a la aplicación todos los datos de una entidad de la DB o los datos de un ID espécífico.
- **Put:** Es el método modificador, usualmente se envía también el id del elemento que deseo modificar, Por ejemplo: Soy un Admin y deseo modificar un titulo, una imágen, un texto.
- **Patch:** Modifica parcialmente el recurso en el servidor.
- **Post:** Es para crear, si queremos crear un producto, debe ser a través de este método.
- **Delete:** Para eliminar información

![](https://static.platzi.com/media/user_upload/REST-65e4240f-662b-406e-91c9-57d8b0dd56f4.jpg)

#### **Diferencia entre PUT y PATCH**

**PUT** tiene que actualizar todos los valores

**PATCH** actualiza solo un valor deseado.

### Web Services

Explicación de conceptos [aquí](https://aldeahost.com.mx/todo-lo-que-necesitas-saber-sobre-el-web-service/)

![](https://static.platzi.com/media/user_upload/Captura-d336ab2e-8e2d-40a4-808a-ee3da1fbdaef.jpg)

### Endpoints
Los endpoints especificos deben ir antes que los dinamicos
```
app.get('/products/filter', (req, res) => {
  res.send('yo soy un filter');
});
// Endpoint dinamico
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Botas',
    price: 2000,
  });
});
```
___

```
// Creación middleware interno de express
app.use(express.json());
```
___
[HTTP responses](https://http.cat/)

- Informational responses (100 – 199)
- Successful responses (200 – 299)
- Redirection messages (300 – 399)
- Client error responses (400 – 499)
- Server error responses (500 – 599)


### Middlewares
Un **Middleware** es un manejador de peticiones antes de que lleguen a su endpoint final

[Documentación de Express.js](https://expressjs.com/en/guide/writing-middleware.html) para entender cómo escribir middlewares, qué son y qué [casos de uso](https://expressjs.com/en/guide/using-middleware.html) le puedes dar en tus apps como:

- Middleware a nivel de aplicación
- Middleware a nivel de direccionamiento (routers)
- Middleware para manejo de errores
- Middlewares incorporados
- Middleware de terceros

Casos de usos según el profe:
- Funcionar como pipes
- Validación de datos
- Capturar Errores
- Validar Permisos
- Controlar Accesos

## Lista de los middlewares más populares en Express.

### CORS
*Middleware* para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. 

[Doc](http://expressjs.com/en/resources/middleware/cors.html)

### Morgan
Un *logger* de solicitudes HTTP para Node.js. 

[Doc](http://expressjs.com/en/resources/middleware/morgan.html)

### Helmet
Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! 

[Doc](https://github.com/helmetjs/helmet)

### Express Debug
Nos permite hacer *debugging* de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando. 

[Doc](https://github.com/devoidfury/express-debug)

### Express Slash
Este *middleware* nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. 

[Doc](https://github.com/ericf/express-slash)

### Passport
Passport es un *middleware* que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. 

[Doc](https://github.com/jaredhanson/passport)

Puedes encontrar más *middlewares* populares en el siguiente enlace: 
[Doc](http://expressjs.com/en/resources/middleware.html)


## Consideraciones para el envio a Produccion:

- Cors: Que acceso y a quienes le damos acceso para hacer solicitudes
- HTTPS: Que la API esta sobre servidor de HTTPS
- Procesos de Build: Se ve en procesos que cosas que tiene procesar información (typescript)
- Remover logs: No es bueno tener logs, a veces esto tiene demoras, existen mejor formas para capturar logs.
- Seguridad (helmet): Muy importante la seguridad y para esto se recomienda helmet que es una colección de Middleware que colocan capas de segridad a la aplicación
- Testing: Correr prebas unitarias o de integración antes de salir de producción


## Deployment
[Railway](https://railway.app/)

[How to deploy](https://www.youtube.com/watch?v=ewoIdVjakns&ab_channel=AgustinNavarroGaldon)

[Deploy](https://nodejs-api-rest-expressjs-production.up.railway.app/)


### Diferencia entre autenticación & autorización

#### Autenticación: 
Este proceso es para determinar si la combinación de usuario y contraseña son las correctas.

**Si es correcta:**
Nos dan una llave para acceder, (en este curso esa llave será un token generado por la librería jsonwebtoken )

**Si NO es correcta:**
El servidor nos prohibe continuar y lo normal es que nos responda con un código http 401 que significa Unauthorized

#### Authorizacion: 
Es cuando el servidor ya verificó que la contraseña y usuario son correctas y se le devolvió correctamente al usuario un token (la llave) pero se quiere usar esa llave para entrar a una parte del sitio **prohibido** para ese usuario, esto puede suceder cuando:

- El usuario no es administrador y quiere acceder a una página sólo para admistradores (petición get) .
- El usuario quiere realizar una petición tipo delete/post/put a un recurso pero sólo tiene permisos de lectura ese usuario.

Lo normal es que el servidor responda con status code 403 cuando esto sucede

![](https://www.redeszone.net/app/uploads-redeszone.net/2020/06/diferencias-autenticacion-autorizacion-3.jpg)


### ¿Qué es un ORM?

Un ORM es un modelo de programación que permite mapear las estructuras de una base de datos relacionales.


### Comandos Docker

|Comando| Descripción |
|--|--|
| docker-compose up -d nombreservicio | Levantamos nuestro servicio en docker |
| docker-compose ps | Revisamos que esta corriendo |
| docker ps | Revisamos los id de nuestros servicios |
| docker inspect idservicio | Revisamos el servicio en específico |


### ¿Qué son las migraciones?

Las migraciones son:

>Las migraciones son la forma en que Django propaga cambios en los modelos y los refleja en el esquema de bases de datos. - **Django**.

>Las migraciones son como un sistema de control de versiones para la base de datos. - **Laravel**.

>Es como un sistema de control de versiones para manejar los cambios desde el código y trackear los cambios en la base de datos. - **Sequelize**.

Básicamente, las migraciones **mantienen el historial** del esquema que se lleva en la base de datos. Es un sistema muy usado en ambientes de producción para **trackear** los **cambios** sin tener que replicar todo nuevamente *(creación de tablas, llaves foráneas, etc)*. Es decir, permite saber en qué punto estaba para saber qué es lo que se tiene que modificar.


### Asociaciones
![](https://static.platzi.com/media/user_upload/Screen%20Shot%202021-10-25%20at%2013.25.34-0aa425c8-d2c0-4cba-ae01-f214e9604c14.jpg)
