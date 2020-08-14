// import express
const express = require('express');
// start express on server
const server = express();
// import routers
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
// middleware
const logger = require("./logger/logger")
// server.use express
server.use(express.json());
// server.use middleware
server.use(logger());
// server.use routers
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter)

// // server.use error middleware
// server.use((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json({
//     message: "Something went wrong, try again later",
//   })
// })

// on server start
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
// function logger(req, res, next) {}
module.exports = server;
