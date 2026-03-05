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
    database: "webshopping",
    port: "3306"
});


app.get(`/`, (req, res) => {db.query(`SELECT 1`) // kollar koppling
    .then(() => {console.log('Database connected')})
    .catch(err => {console.log('Database error')})
console.log(req.method, req.path);
})

app.get(`/categories`, (req, res) => { // commonJS fil tar an datan
  db.query(`SELECT * FROM categories`, (err, data) => {
        res.send(data);
    });console.log(req.method, req.path);
});

app.get(`/categories/:id`, (req, res) => { //express ger till common
  db.query(`SELECT * FROM categories WHERE ID = ?`, req.params.id, (err, data) => {
        res.send(data);
    console.log(req.method, req.path);
    });
});
/*app.get("/categories/:id", (req, res) => { // express skickar direkt till HTML
  db.query(`SELECT * FROM categories WHERE ID = ?`, req.params.id, (err, data) => { // Hur får man in data från olika celler
        res.send(`<div class=/'product/'><div class=/'productTitle/'>${}</div><div class=/'productDescription/'>${}</div><div class=/'productPrice/'>${}</div></div>`);
    console.log(req.method, req.path);
    });
});*/

app.get(`/productInfo/:title`, (req,res) => { //Datan som ges är titeln
     db.query(`SELECT *  FROM allProducts WHERE productName = ? `, req.params.title, (err, data) => 
        {res.send(data)});
     console.log(req.method, req.path);
    });

app.get(`/productInfo`, (req, res) => {
    db.query(`SELECT * FROM productInfo`, (err, data) => {res.send(data)});
    console.log(req.method, req.path);
});


app.post(`/productInfo/:name/:description/:price/:category`, (req, res) => {
    db.query(`INSERT INTO productInfo (productName,productDescription,productPrice,categories_id) VALUES(?,?,?,?)`, 
        req.params.name,req.params.description,req.params.price,req.params.category, (err, data) => {res.json(data)});
    console.log(req.method,req.path);
});

app.post(`/userInformation/:userName/:userEmail/:userPassword/:createTime`, (req, res) => {
    db.query(`INSERT INTO userInformation (userName,userEmail,userPassword,createTime)`)
})

const newPrice = 20.00;
app.put('/productInfo/:id', (req, res) => {
    db.query(`SELECT productPrice FROM productInfo WHERE ID IS ?`, 
        req.params.id, (err, data) => {res.send(newPrice)});
    console.log(req.method,req.path);
});

app.listen(PORT, () => {console.log(`Server ${PORT} är på`);});
