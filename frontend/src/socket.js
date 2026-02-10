import { io } from "socket.io-client";

const socket = io(); //io() без параметров — подключится к тому же хосту откуда загружена страница (Hexlet бэкенд).

socket.on('connect', () => {
  console.log('Socket connected:', socket.id)
})

socket.on('connect_error', (error) => {
  console.log('Socket error:', error)
})

export default socket
