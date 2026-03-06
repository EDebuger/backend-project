const express = require("express");
const app = express();
const database = require("mysql2");
const bodyparser = require('body-parser');
const PORT = 3009;
const cors = require('cors');
const session = require('express-session');

app.use(cors());
app.use(express.json());

// middleware
app.use(bodyparser.urlencoded({extended:true}));// url-encoded
app.use(bodyparser.json()); // for JSON bodies
app.use(session({
    secret:'secret-key', //bara en placeholder
    resave:false,
    saveUninitialized:false,
}));

const db = database.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webshopping",
    port: "3306"
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to the database');
})


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
    const query = `SELECT p.productName AS title, c.categoryNames AS category, 
    p.productDescription AS description, p.productPrice AS price FROM productInfo p 
    RIGHT JOIN categories c ON p.Categories_ID = c.ID ORDER BY p.ProductName ASC`;

    db.query(query, (err, results) => {
        if(err) {
            console.error('Error fetching products', err);
        return res.status(500).json({error: 'Database query failed'});}
        
         // Se till att resultat kommer
        if (results.length === 0) {
            return res.status(404).json({ error: 'No products found.' });
        }

        // Allting kommer som JSON
        res.json(results);
    });
});

app.get(`/productInfo`, (req, res) => { // Denna är som den ovan
    const query = `SELECT p.productName AS title, c.categoryNames AS category,
    p.productDescription AS description, p.productPrice AS price FROM productInfo p 
    RIGHT JOIN categories c ON p.Categories_ID = c.ID ORDER BY p.ProductName DESC`; //Men här så blir bokstavsordningen annorlunda

    db.query(query, (err, results) => {
        if(err) {
            console.error('Error fetching products', err);
        return res.status(500).json({error: 'Database query failed'});}
        
         // Se till att resultat kommer
        if (results.length === 0) {
            return res.status(404).json({ error: 'No products found.' });
        }

        // Allting kommer som JSON
        res.json(results);
    });
});



app.post(`/productInfo`, (req, res) => { //post don't have parameters
    db.query(`INSERT INTO productInfo (productName,productDescription,productPrice,categories_id) VALUES(?,?,?,?)`, (err, data) => {
        if(err) {console.error('Product was not inserted', err);
            return res.status(406); }

        res.json(data)});
    console.log(req.method,req.path);
});



/*app.post(`/userInformation`, (req, res) => {// Make a user
    const{uName, email, uPass,time} = req.body;
    db.query(`INSERT INTO userInformation (userName,userEmail,userPassword,createTime) VALUES (?,?,?,?)`, [uName, email, uPass], (err, result) => {
        if(err) {throw err;}
        res.send('User registered!')
    })
})*/

/*------------------------------------------------------------------------------------------- */
app.post(`/login`, (req, res) => {
    console.log(req.body); // Check what is being received
    const { userName, userPassword } = req.body; // checking if this crap works

    const query = `SELECT * FROM userInformation WHERE UserName = ? AND UserPassword = ?`;
    db.query(query, [userName, userPassword], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            req.session.user = result[0]; // Store user info
            //res.send(`User is logged in`);
            res.redirect('/index'); // Redirect to index.html
        } else {
            res.send('Invalid name or password, get out');
        }
    });
}); // get skickar dig tillbaka till huvudsidan
app.get('/index', (req, res) => {
    if(req.session.user) {
    res.sendFile(__dirname + '/profile.html');}
    else {
        res.redirect('login'); // Se till att bli inloggad annars hamnar du tilbkas hit
    }
})
app.get('/toLogin', (req, res) => {
    res.redirect('/login.html'); // Svarar inte
})


/*-------------------------------------------------------------------------------------------*/ 


app.get(`/getUsers`, (req, res) => {
    db.query(`SELECT * FROM userInformation`, (err, data) => {
        if(err) throw err;
        res.json(data);
    })
})



const newPrice = 20.00;
app.put('/productInfo/:id', (req, res) => {
    db.query(`SELECT productPrice FROM productInfo WHERE productName IS ?`, //Search by name
        req.params.id, (err, data) => {res.json(newPrice)}); // figure out how to change price
    console.log(req.method,req.path);
});

app.listen(PORT, () => {console.log(`Server ${PORT} är på`);});
