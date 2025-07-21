// const express = require('express');
import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Hello World ne");
});

app.get("/ifanit", (req, res) => {
    res.send("Hello iFanIT");
});

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`)
});