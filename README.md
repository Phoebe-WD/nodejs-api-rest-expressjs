# NodeJs API Rest con ExpressJs

### Pre Config

Instalamos los paquetes que usaremos

`npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D`

En nuestro package.json crearemos nuestros comandos:
```
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
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
