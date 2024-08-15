const mysql = require('mysql2' );

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'management',
  });

  
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}
const HellUser = (req, res) => {
    return res.render("user.ejs")
}
const handleCreateNewUer = (req, res) => {
    let email = req.body.emailname ;
    let password = req.body.password
    let username = req.body.username

    console.log(email)

    connection.query(`INSERT INTO users (email , password , username) VALUES (?, ?, ?)`, 
        [email, password, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        }
    );
    console.log ("check req" , req.body)
    return res.send("create" )


}

module.exports = { handleHelloWorld, HellUser, handleCreateNewUer }