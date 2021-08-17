const express = require('express');


const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});