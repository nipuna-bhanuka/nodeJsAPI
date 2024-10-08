const database = require('../config/mysql.config.js');
const Response = require('../domain/response.js');
const logger = require('../util/logger.js');
const QUERY = require('../query/patient.query.js');

const Httpstatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'},
};


const getPatients = (req,res) =>{
    logger.info(`${req.method} ${req.originalUrl}, fetching patients`);
    database.query(QUERY.SELECT_PATIENTS, (error,results)=>{
        if(!results){
            res.status(Httpstatus.OK.code)
                .send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, `no patients found`));
        } else {
            res.status(Httpstatus.OK.code)
                .send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, `patients retrived`,results));     
        }
    })
};

const getPatient = (req,res) =>{
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error,result)=>{
        if(!result[0]){
            res.status(Httpstatus.NOT_FOUND.code)
                .send(new Response(Httpstatus.NOT_FOUND.code, Httpstatus.NOT_FOUND.status, `no patient found ${req.params.id}`));
        } else {
            res.status(Httpstatus.OK.code)
                .send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, `patient retrived`, result[0]));     
        }
    })
};

const createPatient = (req,res) =>{
    logger.info(`${req.method} ${req.originalUrl}, creating patient`);
    database.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(req.body), (error,results) => {
        if(!results){
            logger.error(error.message);
            res.status(Httpstatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(Httpstatus.INTERNAL_SERVER_ERROR.code, Httpstatus.INTERNAL_SERVER_ERROR.status, `error occured`));
        } else {
            //const patient = {id: results.insertedId, ...req.body, created_at: new Date()};
            const patient = results[0][0];
            res.status(Httpstatus.CREATED.code)
                .send(new Response(Httpstatus.CREATED.code, Httpstatus.CREATED.status, `patient created`, {patient}));     
        }
    })
};

const updatePatient = (req,res) =>{
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error,results)=>{
        if(!results[0]){
            res.status(Httpstatus.NOT_FOUND.code)
                .send(new Response(Httpstatus.NOT_FOUND.code, Httpstatus.NOT_FOUND.status, `no patient found ${req.params.id}`));
        } else {
            logger.info(`${req.method} ${req.originalUrl}, updating patient`)
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id], (error,result)=>{
                if(!error){
                    res.status(Httpstatus.OK.code)
                        .send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, `patient updated`, {id: req.params.id, ...req.body})); 
                }
                else{
                    logger.error(error.message);
                    res.status(Httpstatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(Httpstatus.INTERNAL_SERVER_ERROR.code, Httpstatus.INTERNAL_SERVER_ERROR.status, `error occured`));
                }
            });   
        }
    })
};

const deletePatient = (req,res) =>{
    logger.info(`${req.method} ${req.originalUrl}, deleting patient`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error,result)=>{
        if(result.affectedRows >0){
            res.status(Httpstatus.OK.code)
                .send(new Response(Httpstatus.OK.code, Httpstatus.OK.status, `patient deleted`, result[0]));  
        } else {
            logger.error(error.message);
            res.status(Httpstatus.NOT_FOUND.code)
                .send(new Response(Httpstatus.NOT_FOUND.code, Httpstatus.NOT_FOUND.status, `no patient found ${req.params.id}`));  
        }
    })
};


module.exports = {
    Httpstatus,
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient
};

