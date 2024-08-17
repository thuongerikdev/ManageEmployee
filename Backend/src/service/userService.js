const bcript = require("bcryptjs");
const Bluebird = require("bluebird");
const salt = bcript.genSaltSync(10)
const mysql = require("mysql2/promise")

// Create the connection to database

const hashUserPassWord = (userPassword) => {
    let hashPassWord = bcript.hashSync(userPassword, salt);
    return hashPassWord
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassWord(password)
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'management',
        Promise: Bluebird
    });

    connection.query(`INSERT INTO users (email , password , username) VALUES (?, ?, ?)`,
        [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        }
    );

}
const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'management',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('select * from users')
        return rows
    }
    catch (err) {
        console.log(err)




        // let user = [] ;
        // connection.query(`select * from users`,
        //     function (err, results, fields) {
        //         if (err) {
        //             console.log(err);
        //             return user
        //         }
        //         user= results
        //         console.log(results); 
        //         return user

        //     }

        // );

    }
}
const DeleteUser = async (id) => {


    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'management',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('delete from users where id=?'
            , [id]
        )
        return rows
    }
    catch (err) {
        console.log(err)
    }

}
const getIdbyUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'management',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('select * from users where id=?'
            , [id]
        )
        return rows
    }
    catch (err) {
        console.log(err)
    }
}
const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'management',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute(
            'UPDATE users SET email = ?, username = ? WHERE id = ?',
            [email, username, id]
        );
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        await connection.end(); // Ensure the connection is closed
    }
};

module.exports = { updateUserInfor, createNewUser, getUserList, DeleteUser, getIdbyUser }