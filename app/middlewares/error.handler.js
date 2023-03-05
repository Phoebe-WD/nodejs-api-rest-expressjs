// Creamos una función que nos hará llegar a un middleware tipo error:
function logError(err, req, res, next) {
  console.log('logError');
  // Mostramos el tipo de error en servidor para monitorearlo
  console.error(err);
  /* Le decimos que este será un middleware tipo error
  !importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
  */
  next(err);
}
// Crear formato para devolverlo al cliente que se complementa con la función anterior
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logError, errorHandler, boomErrorHandler };
