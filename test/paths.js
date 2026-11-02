const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'w2a-paths-'));
const source = path.join(root, 'source');
fs.mkdirSync(source);
const input = path.join(root, 'file');
fs.writeFileSync(input, 'not a directory');
const code = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
function run(from, to) {
  const processStub = { argv: ['node', 'w2a', from, to], exit: status => { throw { status }; } };
  try {
    vm.runInNewContext(code, { require: name => name === './lib/wxmp2antmp' ? { to: () => {} } : require(name), process: processStub, console: { log: () => {}, error: () => {} } });
    return processStub.exitCode || 0;
  } catch (error) {
    if (typeof error.status === 'number') return error.status;
    throw error;
  }
}
try {
  assert.strictEqual(run(path.join(root, 'missing'), path.join(root, 'out')), 1);
  assert.strictEqual(run(input, path.join(root, 'out')), 1);
  assert.strictEqual(run(source, source), 1);
  const nested = path.join(source, 'out');
  assert.strictEqual(run(source, nested), 1);
  assert.strictEqual(fs.existsSync(nested), false);
  const link = path.join(root, 'link');
  fs.symlinkSync(source, link, 'dir');
  assert.strictEqual(run(link, nested), 1);
  assert.strictEqual(run(source, path.join(link, 'out')), 1);
  assert.strictEqual(fs.existsSync(nested), false);
  fs.unlinkSync(link);
  assert.strictEqual(run(source, path.join(root, 'source-sibling')), 0);
  assert.strictEqual(run(source, path.join(root, 'source-sibling')), 1);
} finally {
  if (fs.existsSync(path.join(root, 'source-sibling'))) fs.rmdirSync(path.join(root, 'source-sibling'));
  fs.rmdirSync(source);
  fs.unlinkSync(input);
  fs.rmdirSync(root);
}
console.log('CLI path validation regression tests passed');
