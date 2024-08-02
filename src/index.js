const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ip = require('ip');
const Response = require('./domain/response.js');
const logger = require('./util/logger.js');
const {Httpstatus} = require('./controller/patient.controller.js');
const patientRoutes = require('./route/patient.route.js');

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/patients', patientRoutes);

app.get('/', (req,res)=>{
    res.send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, 'Patient API, v1.0.0' ));
});

app.get('*', (req,res)=>{
    res.status(Httpstatus.NOT_FOUND)
        .send(new Response(Httpstatus.NOT_FOUND.code, Httpstatus.NOT_FOUND.status, 'Roure does not exist'));
});

app.listen(PORT, () => {
    logger.info(`Server running at http://${ip.address()}:${PORT}/`)
})