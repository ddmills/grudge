# `@grudge/domain`

> Grudge domain models

## Usage

```js
import { User } from '@grudge/domain';

// see the default property values
console.log(User.defaults);

// create an instance
const user = new User({ name: 'hello' });
const user2 = user.clone();
const user3 = User.create({ name: 'bobby' });

// see current properties
console.log(user.properties);
console.log(user.name);

// properties are frozen
user.name = 'jimmy'; // Error!
```
