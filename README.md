# CDGD Admin

#### To get the app running

#### nvm

Make sure to run `nvm use` from the root directory to set the correnct node version

##### Frontend
`npm start`
The entrypoint at this time is `http://localhost:3000/login`

##### Backend

    cd backend
    PORT=5000 npm start

#### MySQL

`mysql -h localhost -u cdgd --protocol TCP -D cdgd -p`

#### Knex Migrations

To make the file:

`knex migrate:make create_client_table`

To run the migrations:

`knex migrate:latest`

To rollback:

`knex migrate:rollback`

#### Docker Compose

From the `docker/` folder:

`docker-compose up -d`