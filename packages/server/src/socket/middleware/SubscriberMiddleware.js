export default function createMiddleware() {
  return (socket, next) => {
    socket.join(socket.user.id);
    next();
  };
}
