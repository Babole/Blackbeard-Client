import io from 'socket.io-client'

const socket = io.connect("http://localhost:5000/")
// const socket = io.connect('https://blackbeard-island-skt.herokuapp.com/')

socket.on("connect", () => {
    console.log(`user connected to the socket id ${socket.id}`);
    // socket.emit('connect', {data: 'I\'m connected!'})
});

export { socket };
