//Import Dependencies
const express = require ('express');
const app = express();
const mysql = require ('mysql2');
const port = process.env.PORT || 3000;

//Setup Dependencies
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lolbukid123',
    database: 'infoSec'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
//Routes

//Get for Home Page
app.get('/', (req, res) => {
    res.render('index',{title: 'Home'});
});

//Get and Post for Login
app.get('/login', (req, res) => {
    res.render('login',{title: 'Login'});
});
app.post('/login', (req, res) => {
    const username = req.body.logemail;
    const password = req.body.logpass;

    if (username === "" || password === "") {
        res.status(400).json({ error: "Please enter a username and password" });
    } else {
        db.query('SELECT * FROM users WHERE username = ? AND password = ? ', [username, password], (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                if (row) {
                    res.redirect('/');
                } else {
                    // User not found or incorrect credentials
                    res.status(401).json({ error: "Invalid credentials" });
                }
            }
        });

    }
});

//Post for Register
app.post('/register', (req,res)=> {
    const email = req.body.regemail;
    const username = req.body.regusername;
    const password = req.body.regpass;
    const authority = 1;
    if (username == "" || password == "") {
        window.alert("Please enter a username and password");
        } else{
    db.query('INSERT INTO users (username,email,password,authority) VALUES (?,?,?,?)', [username,email,password,authority], (err) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("User added");
            res.redirect('/login');
        }
        
    });
        }
})

app.get('/download', (req, res) => {
    res.render('download',{title: 'Download'});
});
app.get('/about', (req, res) => {
    res.render('aboutus',{title: 'About'});
});
app.get('/forum', (req, res) => {
    db.query('SELECT * FROM forum', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Forum loaded");
            res.render('forum', { title: 'Forum', rows: rows });
        }
    });
});

app.post('/forum', (req, res) => {
    const title = req.body.title;
    const message = req.body.message;
    db.query('INSERT INTO forum (title, message, userId) VALUES (?,?,1)', [title, message], (err) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Message added");
            res.redirect('/forum');
        }
        
    });
});

app.post('/deletepost', (req, res) => {
    const postId = req.body.postId;
    db.query('DELETE FROM forum WHERE id = ?', [postId], (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // Internal Server Error
        } else {
            console.log(`Post ${postId} deleted`);
            res.redirect('/forum');
        }
    });
});

app.get('/updatepost',(req,res) => {
    const postId = req.query.postId;
    db.query('SELECT * FROM forum WHERE id = ?', [postId], (err, row) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // Internal Server Error
        } else {
            console.log(`Post ${postId} loaded`);
            res.render('updatepost', { title: 'Update Post', row: row });
        }
    });
});





process.on('exit', () => db.close());
//Setup Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});