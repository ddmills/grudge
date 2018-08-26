import { Lobby } from '@grudge/domain';

let currentId = 0;
const lobbies = {};

export async function save(lobby) {
  let lobbyWithId;

  if (lobby.id) {
    lobbyWithId = lobby;
  } else {
    lobbyWithId = lobby.clone({
      id: `lobby-${++currentId}`,
    });
  }

  lobbies[`lobby-${currentId}`] = lobbyWithId.properties;

  return Promise.resolve(lobbyWithId);
}

export async function create(properties) {
  return save(Lobby.create(properties));
}

export async function get(lobbyId) {
  if (!(lobbyId in lobbies)) {
    const error = new Error(`Could not find lobby with id ${lobbyId}`);

    return Promise.reject(error);
  }

  const lobby = Lobby.create(lobbies[lobbyId]);

  return Promise.resolve(lobby);
}
