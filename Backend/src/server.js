import express from 'express'
require('dotenv').config()
const configViewEngine = require ('./configs/viewEngine')
const initWebRouter = require ('./routes/web');
const bodyParser = require("body-parser")

const app = express();
const port = process.env.PORT||8080 ;

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

//config view engine
configViewEngine(app);

//init web route
initWebRouter(app)


app.listen ( port , () => {
    console.log ('backend is running on port ' + port)
})

