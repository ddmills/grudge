# `@grudge/data`

> Shared static data

## Usage

```js
import { CardTypes } from '@grudge/data';

CardTypes.forEach((rawCardType) => {
  console.log(rawCardType.id);
  console.log(rawCardType.name);
  console.log(rawCardType.cost);
});
```
