CREATE TABLE patients
(
    id            INT AUTO_INCREMENT,
    patient_name  VARCHAR(100) NOT NULL,
    patient_age   INT          NULL,
    event_code    VARCHAR(10)  NULL,
    event_date    DATE         NULL,
    code_category VARCHAR(1)   NULL,
    CONSTRAINT patients_pk
        PRIMARY KEY (id)
);

