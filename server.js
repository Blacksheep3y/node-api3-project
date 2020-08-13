const express = require('express');

const server = express();
// routers
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
// middleware
const logger = require("./logger/logger")
// server.use
server.use(express.json());
server.use(logger());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter)
server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, try again later",
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
// function logger(req, res, next) {}
module.exports = server;
