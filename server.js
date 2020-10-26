// Import express
const express = require("express");

// Create server
const server = express();

// enable express to parse json with middleware
server.use(express.json());

let users = [
  {
    id: 1,
    name: "Joshua",
    bio: "If I dont know the stack, give me a week",
  },
  {
    id: 2,
    name: "Aaliyah",
    bio: "If I dont know the stack, give me a year",
  },
  {
    id: 3,
    name: "Kaelani",
    bio: "If I dont know the stack, give me a 5 years",
  },
  {
    id: 4,
    name: "Levi",
    bio: "If I dont know the stack, give me 5.5 years",
  },
];
console.log(users.find((user) => user.id === 4) ? true : false);
// Create endpoints
/*
POST	/api/users	Creates a user using the information sent inside the request body.
GET	/api/users	Returns an array users.
GET	/api/users/:id	Returns the user object with the specified id.
DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
 */
server.post("/api/users", (req, res) => {
  user = req.body;
  //   users.push(user);
  if (
    user.name === undefined ||
    user.name.length < 2 ||
    user.bio === undefined ||
    user.name.length < 2
  ) {
    // users.push(user);
    res.status(400).json({
      errorMessage: "Please provide valid name(2 char) and bio for the user.",
    });
  } else {
    try {
      users.push(user);
      res.status(201).json(users);
    } catch (e) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
  console.log(user.name === undefined || user.name.length < 5);
  res.status(201).json(users);
});
server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let indx = 0;
  user = users.filter((user) => user.id === Number(id));
  if (user.length > 0) res.status(200).json(user);
  else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});
// console.log(users.find(4));
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  user = users.find((user) => user.id === Number(id));
  if (user) {
    try {
      users = users.filter((user) => user.id !== Number(id));
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});
server.put("/api/users/:id", (req, res) => {
  const user = req.body;
  const id = req.params.id;
  isUser = users.find((user) => user.id === id);
  if (isUser !== null) {
    user.id = id;
    try {
      users = users.filter((user) => user.id !== Number(id));
      users.push(user);
      res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});
// enable express to listen for requests
const port = 8000;

server.listen(port, () => console.log(`Day 1 Module API on port ${port}`));

const a = { type: "cake" };
a.type = "soup";
console.log(a["type"]);
