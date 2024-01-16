//Import Dependencies
const express = require ('express');
const app = express();
const sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;

//Setup Dependencies
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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
        const db = new sqlite3.Database('./database.db');
        db.get('SELECT * FROM user WHERE username = ? AND password = ? ', [username, password], (err, row) => {
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

        // Close the database connection after use
        db.close();
    }
});

//Post for Register
app.post('/register', (req,res)=> {
    const username = req.body.regemail;
    const password = req.body.regpass;
    if (username == "" || password == "") {
        window.alert("Please enter a username and password");
        } else{
    const db = new sqlite3.Database('./database.db');
    db.get('INSERT INTO user (username, password) VALUES (?,?)', [username, password], (err) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("User added");
            db.close();
            res.redirect('/login');
        }
        
    });
        }
})

app.get('/download', (req, res) => {
    res.render('download',{title: 'Download'});
});

//Setup Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});