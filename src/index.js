const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ip = require('ip');
const Response = require('./domain/response.js');
const logger = require('./util/logger.js');
const Httpstatus = require('./controller/patient.controller.js')

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, 'Patient API, v1.0.0' ));
});


app.listen(PORT, () => {
    logger.info(`Server running at http://${ip.address()}:${PORT}/`)
})