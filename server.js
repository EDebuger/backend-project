const express = require("express");
const app = express();
const database = require("mysql2");
const PORT = 3009;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = database.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webshopping"
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, data) => {
        res.send(data);
    });
});

app.get("/categories/:id", (req, res) => {
  db.query("SELECT * FROM categories WHERE ID = ?", req.params.id, (err, data) => {
        res.send(data);
    });
});


app.listen(PORT);
