# variables
LOCAL_IP=127.0.0.1
DOCKER_MYSQL_IMAGE=mysql:5.7.12
DOCKER_MYSQL_CONTAINER_NAME=healthreveal-mysql
DOCKER_MYSQL_DB_NAME=healthreveal-db
DOCKER_MYSQL_ROOT_PASSWORD=pa$$word


# downloading mysql image (specifying 5.7.12 to match AWS aurora DB)
echo "pulling docker image ${DOCKER_MYSQL_IMAGE}"
docker pull ${DOCKER_MYSQL_IMAGE}


# stop & remove stale containers
echo "if exists, stopping previous docker containers and remove them"
docker stop ${DOCKER_MYSQL_CONTAINER_NAME} || true
docker rm ${DOCKER_MYSQL_CONTAINER_NAME} || true


# starting MySQL
echo "starting ${DOCKER_MYSQL_IMAGE}"
docker run -p 3306:3306 -d --name=${DOCKER_MYSQL_CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=${DOCKER_MYSQL_ROOT_PASSWORD} -e MYSQL_DATABASE=${DOCKER_MYSQL_DB_NAME} -e MYSQL_USER=healthreveal -e MYSQL_PASSWORD=healthreveal ${DOCKER_MYSQL_IMAGE}


# Running SQL scripts in order to create everything that we need in MySQL
# Trying to connect to MySQL in order to make sure that we can execute scripts
while ! mysql -h ${LOCAL_IP} -u root -p${DOCKER_MYSQL_ROOT_PASSWORD} -e 'use mysql'; do
	sleep 5
done


# Initialize database
echo "creating database & initializing data"
mysql -h ${LOCAL_IP} -u root -p${DOCKER_MYSQL_ROOT_PASSWORD} -e "
use healthreveal-db;

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

INSERT INTO patients (id, patient_name, patient_age, event_code, event_date, code_category)
VALUES (1, 'Dora Lloyd', 33, 'D456', '2019-01-01', 'C'),
       (2, 'Dora Lloyd', 33, 'L222', '2019-01-01', 'B'),
       (3, 'Dora Lloyd', 33, 'L123', '2019-01-01', 'A'),
       (4, 'Jerome Burton', 48, 'D456', '2019-03-27', 'C'),
       (5, 'Jerome Burton', 48, 'L123', '2019-03-07', 'A'),
       (6, 'Jerome Burton', 48, 'M222', '2019-03-07', 'C'),
       (7, 'Marlon Delgado', 55, 'M333', '2019-07-13', 'B'),
       (8, 'Tomas Walters', 64, 'D234', '2019-07-13', 'D'),
       (9, 'Tomas Walters', 64, 'L222', '2019-07-13', 'A'),
       (10, 'Tomas Walters', 64, 'M222', '2019-07-13', 'C');
"
