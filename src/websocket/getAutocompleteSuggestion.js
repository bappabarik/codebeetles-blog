import { io } from "socket.io-client"
import conf from "../conf/conf";

// Initialize the socket without connecting
const socket = io(conf.proxyServer, {
    autoConnect: false, // Prevent automatic connection
});

// Function to connect with the query parameter
function connectWithUserId(userId) {
    socket.io.opts.query = { userId }; // Set the query parameters dynamically
    socket.connect(); // Manually initiate the connection
  }

export {socket, connectWithUserId} 