/* eslint-disable import/no-extraneous-dependencies */
const config = require('config');
const fs = require('fs');
const selfsigned = require('selfsigned');

const keys = selfsigned.generate([{
  name: 'commonName',
  value: 'localhost',
}, {
  name: 'organizationName',
  value: 'Porpiose',
}], {
  keySize: 2048,
  days: 365,
  algorithm: 'sha256',
  extensions: [{
    name: 'basicConstraints',
    cA: true,
  }, {
    name: 'subjectAltName',
    altNames: [{
      type: 2, // DNS
      value: 'localhost',
    }, {
      type: 6, // URI
      value: 'https://localhost',
    }, {
      type: 7, // IP
      ip: '127.0.0.1',
    }],
  }, {
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: true,
    codeSigning: true,
    emailProtection: true,
    timeStamping: true,
  }],
  clientCertificateCN: 'localhost',
});

fs.writeFileSync(config.ssl.certificatePath, keys.cert);
fs.writeFileSync(config.ssl.privateKeyPath, keys.private);

// eslint-disable-next-line no-console
console.info(`
These keys should be used for local development only.
Add the certificate to your trusted certificate store.

  SSL certificate saved to ${config.ssl.certificatePath}
  SSL private key saved to ${config.ssl.privateKeyPath}
`);
