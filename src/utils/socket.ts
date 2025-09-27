import { io } from "socket.io-client";

const socket = io("http://192.168.0.11:3001");

export default socket;