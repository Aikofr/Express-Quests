const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json()); // add this line

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { validateUser } = require("./validateUser.js");
const { validateMovie } = require("./validateMovie.js");

app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.post("/api/users", validateUser, movieHandlers.postUsers);

app.put("/api/users/:id", validateUser, movieHandlers.updateUsers);
app.delete("/api/users/:id", movieHandlers.deleteUsers);

app.post("/api/movies", validateMovie, movieHandlers.postUsers);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
