// const express = require('express');
import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import apiRoutes from "routes/api";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;

// config cors
app.use(cors()); //<-- cách cũ (đơn giản)
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "DELETE", "PUT"]
//     }
// });

// io.on('connection', (socket) => {
//     console.log("A user connected", socket.id);

//     socket.on('disconnect', () => {
//         console.log("A user disconnected", socket.id);
//     });
// });

// app.set('io', io); // <-- truyền qua cho controller
// app.use(cors());

// config view engine
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files: images/css/js
app.use(express.static('public'));

// config routes
webRoutes(app);
apiRoutes(app);

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`)
});