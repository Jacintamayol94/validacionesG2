const bcryptjs = require('bcryptjs');

let hash = (bcryptjs.hashSync('hola12', 10));

console.log(hash);
console.log(bcryptjs.compareSync(hash, 'abc123'));