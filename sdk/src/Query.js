
export default class Query {
  static send(socket, event, ...args) {
    return new Promise((resolve, reject) => {
      if (!socket.connected) {
        reject(new Error('Socket is not connected'));
      } else {
        socket.emit(event, ...args, (error, ...data) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(...data);
          }
        });
      }
    });
  }
}
