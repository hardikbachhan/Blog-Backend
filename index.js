const express = require("express");
const app = express();
const port = process.env.port || 3000;

const authRouter = require("./routes/auth");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use(express.json());    // to read json data sent from client.

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter)

app.listen(port, () => {
    console.log(`Blog app listening on port ${port}`);
});
