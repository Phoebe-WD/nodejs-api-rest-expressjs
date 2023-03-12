const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin_123 .202';
  /*
  ! Usamos nuestra librería para encriptar el password. Esta recibe dos parámetros:
  ! 1. Lo que queremos encriptar
  ! 2. la cantidad de veces que queremos que genere un encriptado
  */
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();

// * Output: $2b$10$6HKwZPKh.gEDPsfu/nV1vO6lEwxOq7YoRsE7FlJeXJELgboij.p7K
