const assert = require('assert');
const app = require('./index');

const server = app.listen(0, async () => {
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}/api/info`;

  try {
    // 1. age < 18 -> 403
    const underAge = await fetch(`${base}?name=Minh&age=16`);
    assert.strictEqual(underAge.status, 403);

    // 2. age >= 18 -> 200
    const adult = await fetch(`${base}?name=Minh&age=20`);
    assert.strictEqual(adult.status, 200);
    const body = await adult.json();
    assert.strictEqual(body.name, 'Minh');
    assert.strictEqual(body.age, 20);

    // 3. missing age -> 400
    const missing = await fetch(`${base}?name=Minh`);
    assert.strictEqual(missing.status, 400);

    console.log('All tests passed.');
  } finally {
    server.close();
  }
});
