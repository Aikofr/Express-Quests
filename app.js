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

app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.post("/api/users", movieHandlers.postUsers);

app.put("/api/users/:id", movieHandlers.updateUsers);
app.delete("/api/users/:id", movieHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
