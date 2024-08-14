import express from 'express'
require('dotenv').config()
const configViewEngine = require ('./configs/viewEngine')
const initWebRouter = require ('./routes/web');

const app = express();
const port = process.env.PORT||8080 ;


//config view engine
configViewEngine(app);

//init web route
initWebRouter(app)


app.listen ( port , () => {
    console.log ('backend is running on port ' + port)
})

