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
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.get("/api/movies", movieHandlers.getMovies);
app.post("/api/users", validateUser, hashPassword, movieHandlers.postUsers);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post(
  "/api/login", movieHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// then the routes to protect
app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.put("/api/users/:id", validateUser, hashPassword, movieHandlers.updateUsers);
app.delete("/api/users/:id", movieHandlers.deleteUsers);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
