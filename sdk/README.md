# `@otter/sdk`

```js

import sdk from '@otter/sdk';

sdk.configure(token);

sdk.on(LOBBY_CREATED, (lobby) => {});

sdk.connect();
sdk.onConnected(() => {});
sdk.onDisconnected(() => {});

sdk.onLobbyCreated((lobby) => {});
sdk.createLobby(options).then((lobbyId) => {});
sdk.createLobby(options).then((lobby) => {});

sdk.getUser(userId).then((user));

sdk.on('lobby/created', (lobby) => {});
```
