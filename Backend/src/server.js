import express from 'express'
require('dotenv').config()
const configViewEngine = require ('./config/viewEngine')
const initWebRouter = require ('./routes/web');
const bodyParser = require("body-parser")
const connection = require('./config/connectDB')
const initAPIRouter = require('./routes/api')
const ConfigCors = require("./config/cors")
const app = express();
const port = process.env.PORT||8080 ;


//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

//cors 
ConfigCors(app)
//test connection
// connection()

//config view engine
configViewEngine(app);

//init web route
initWebRouter(app)
//init api route
initAPIRouter(app)


app.listen ( port , () => {
    console.log ('backend is running on port ' + port)
})

