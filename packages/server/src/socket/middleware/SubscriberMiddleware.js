export default function createMiddleware() {
  return (socket, next) => {
    const {
      lobbyId,
      id: userId,
    } = socket.user;

    socket.join(userId);

    if (lobbyId) {
      socket.join(lobbyId);
    }

    next();
  };
}
