const express= require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
dotenv.config();
const PORT =process.env.PORT
const connectToDB=require('./Database/db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
connectToDB();

//  Routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.use('/api/files',require('./routes/FileShare'));

 

app.listen(PORT,()=>{

    console.log(`Server is running on port ${PORT}`)
})
