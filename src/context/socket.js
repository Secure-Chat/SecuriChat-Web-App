import { createContext } from 'react';
import socketio from 'socket.io-client';
const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL;

export const socket = socketio.connect(SOCKET_SERVER_URL);
export const SocketContext = createContext();