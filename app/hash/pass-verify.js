const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin_123 .202';
  const hash = '$2b$10$6HKwZPKh.gEDPsfu/nV1vO6lEwxOq7YoRsE7FlJeXJELgboij.p7K';
  /*
  ! Usamos nuestra librería para comparar el hash y el password. Esta recibe dos parámetros:
  ! 1. El password del cliente
  ! 2. Y el hash generado
  */
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();

// * Output: true
