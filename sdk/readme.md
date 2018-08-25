# @grudge/sdk

> Client-side sdk for interacting with @grudge/server

## Usage

```js
import sdk from '@grudge/sdk';

// must be done before any query
sdk.configure(token);

// query
const user = await sdk.getUser(userId);
const lobby = await sdk.createLobby(lobbyData);
const currentUser = await sdk.whoAmI();

// listen
sdk.onUserCreated((user) => console.log(`User created`, user));
sdk.onConnecting(() => console.log('connecting'));
sdk.onConnected(() => console.log('socket has connected'));
sdk.onError((error) => console.log(`oops ${error.toString()}`));
```
