const express= require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const PORT =process.env.PORT
const connectToDB=require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
connectToDB()



app.get('/',()=>{
  console.log("Hello World");
})
app.listen(PORT,()=>{

    console.log(`Server is running on port ${PORT}`)
})
