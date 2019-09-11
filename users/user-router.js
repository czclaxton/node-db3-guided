const express = require("express");

const Users = require("./user-model");

const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  Users.add(userData)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(response => {
      if (response) {
        res.json({ update: response });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(response => {
      if (response) {
        res.json({ removed: response });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

// SQL EQUIVALENT OF THE GET BELOW

// SELECT p.id, p.contents, u.username FROM posts as p
// JOIN users AS u ON p.user_id = u.id

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  Users.findPosts(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting user posts" });
    });
});

module.exports = router;
