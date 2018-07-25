# Porpoise

## Setup
```
$ npm install
$ npm start
```

## HTTPS locally

1. Set `PROTOCOL=https` in your `.env` file or in `config/development.js`
2. Generate a certificate and key with `npm run generate-ssl`
3. Trust the self-signed certificate (This step depend on your operating system)
4. Restart your server `npm start`

## Technologies

* :snowflake: [react](https://github.com/facebook/react)
* :truck: [express](https://github.com/expressjs/express)
* :package: [parcel](https://github.com/parcel-bundler/parcel)
* :octopus: [babel](https://github.com/babel/babel)
* :lipstick: [node-sass](https://github.com/sass/node-sass)
* :performing_arts: [postcss](https://github.com/postcss/postcss)
* :iphone: [browser-sync](https://github.com/Browsersync/browser-sync)
* :loudspeaker: [eslint](https://github.com/eslint/eslint)
* :cop: [stylelint](https://github.com/stylelint/stylelint)
* :wrench: [dotenv](https://github.com/motdotla/dotenv)
* :hammer: [config](https://github.com/lorenwest/node-config)
