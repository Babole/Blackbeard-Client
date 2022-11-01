import io from 'socket.io-client'

// const socket = io.connect("http://localhost:5000/")
const socket = io.connect('https://blackbeard-island-skt.herokuapp.com/')

export { socket };
