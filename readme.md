# Porpoise

## Setup

```
$ npm install
$ npm start
```

## Technologies

* :snowflake: [react](https://github.com/facebook/react)
* :truck: [express](https://github.com/expressjs/express)
* :hammer: [workbox](https://github.com/GoogleChrome/workbox)
* :ledger: [dotenv](https://github.com/motdotla/dotenv)
* :wrench: [config](https://github.com/lorenwest/node-config)

## Build Tools

* :package: [parcel](https://github.com/parcel-bundler/parcel)
* :iphone: [browser-sync](https://github.com/Browsersync/browser-sync)
* :octopus: [babel](https://github.com/babel/babel)
* :lipstick: [node-sass](https://github.com/sass/node-sass)
* :performing_arts: [postcss](https://github.com/postcss/postcss)
* :loudspeaker: [eslint](https://github.com/eslint/eslint)
* :cop: [stylelint](https://github.com/stylelint/stylelint)

## HTTPS locally

1. Set `PROTOCOL=https` in your `.env` file or in `config/development.js`
2. Generate a certificate and key with `npm run generate-ssl`
3. Trust the self-signed certificate (This step depend on your operating system)
4. Restart your server `npm start`
