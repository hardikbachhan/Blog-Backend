// mongodb+srv://hardikbachhan:hardikbachhan@cluster0.mntie.mongodb.net/blog?retryWrites=true&w=majority

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
