import express from "express";
const app = express();
import "dotenv/config";
import db from "./db.js";
import Users from "./usersSC.js";

app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/adduser", async (req, res) => {
  try {
    if (!req.body.name || !req.body.password) {
      return res.status(400).json({ message: "Name and password are required" });
    }
    const newUser = new Users(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/deleteuser/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const deletedUser = await Users.deleteOne({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running...");
});
