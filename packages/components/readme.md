# `@grudge/components`

> React components for Grudge

## Usage

```js
import { Container, Avatar, List, ListItem } from '@grudge/components';

export default (users) => (
  <Container size="sm">
    <List>
      {users.map((user) => (
        <ListItem>
          <Avatar user={user}/>
        </ListItem>
      ))}
    </List>
  </Container>
)
```
