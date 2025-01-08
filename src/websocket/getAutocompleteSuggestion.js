import { io } from "socket.io-client"

// Initialize the socket without connecting
const socket = io("http://localhost:3000/", {
    autoConnect: false, // Prevent automatic connection
});

// Function to connect with the query parameter
function connectWithUserId(userId) {
    socket.io.opts.query = { userId }; // Set the query parameters dynamically
    socket.connect(); // Manually initiate the connection
  }

export {socket, connectWithUserId} 