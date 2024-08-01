const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ip = require('ip');
const Response = require('./domain/response.js');
const logger = require('./util/logger.js');

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send(new Response(200, 'Ok', 'Patient API, v1.0.0', 
        {patients : 
            {name : 'nimal'}
        } ));
});


app.listen(PORT, () => {
    logger.info(`Server running at http://${ip.address()}:${PORT}/`)
})