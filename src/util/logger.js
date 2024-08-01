const pino = require('pino');

// Create a logger
const log = pino({
    base : {pid : false},
    transport : {
        target : 'pino-pretty',
        Options : {
            colorizer : true
        }
    },
    timestamp: () => `, "time" : "${new Date().toLocaleString()}"`
});

module.exports = log