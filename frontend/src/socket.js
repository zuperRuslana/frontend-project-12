import { io } from 'socket.io-client'

const socket = io() // io() без параметров — подключится к тому же хосту откуда загружена страница (Hexlet бэкенд).

socket.on('connect', () => {
})

socket.on('connect_error', () => {
})

export default socket
