import io from 'socket.io-client'

const socket = io.connect("http://127.0.0.1:5000")
// const socket = io.connect("https://urlname.herokuapp.com/")

socket.on("connect", () => {
    console.log(`user connected to the socket id ${socket.id}`);
});

export { socket };
