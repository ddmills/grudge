const config = require('config');
const pem = require('pem');
const fs = require('fs');

pem.createCertificate({ days: 1, selfSigned: true }, (keyError, keys) => {
  if (keyError) {
    console.error(keyError);

    return;
  }

  fs.writeFile(config.ssl.certificatePath, keys.certificate, (writeError) => {
    if (writeError) {
      console.error(writeError);
    } else {
      console.info(`SSL Certificate saved to ${config.ssl.certificatePath}`);
    }
  });

  fs.writeFile(config.ssl.keyPath, keys.serviceKey, (writeError) => {
    if (writeError) {
      console.error(writeError);
    } else {
      console.info(`SSL Key saved to ${config.ssl.keyPath}`);
    }
  });
});
