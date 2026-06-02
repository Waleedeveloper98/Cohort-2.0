const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Notification service running");
});

app.listen(3000, () => {
  console.log("Notification service running on port 3000");
});