CREATE DATABASE IF NOT EXISTS patientsdb;
USE patientsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(255) DEFAULT NULL,
    last_name   VARCHAR(255) DEFAULT NULL,
    email       VARCHAR(255) DEFAULT NULL,
    phone       INT(10) DEFAULT NULL,
    address     VARCHAR(255) DEFAULT NULL,
    diagnosis   VARCHAR(255) DEFAULT NULL,
    image_url   VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Patients_Email UNIQUE (email) 
);


DELIMITER //
CREATE PROCEDURE create_return_patient(IN first_name VARCHAR(255), IN last_name VARCHAR(255), 
                IN email VARCHAR(255), IN phone INT(10), IN address VARCHAR(255), 
                IN diagnosis VARCHAR(255), IN image_url VARCHAR(255))
BEGIN 
    INSERT INTO patients (first_name, last_name, email, phone, address, diagnosis, image_url) VALUES (first_name, last_name, email, phone, address, diagnosis, image_url);
    
    SET @PatientId = LAST_INSERT_ID();
    
    SELECT * FROM patients WHERE id = @PatientId;
END //
DELIMITER ;