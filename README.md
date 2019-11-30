# CDGD Admin

#### MySQL

`mysql -h localhost -u cdgd --protocol TCP -D cdgd -p`

#### Knex Migrations

To make the file:

`knex migrate:make create_client_table`

To run the migrations:

`knex migrate:latest`

To rollback:

`knex migrate:rollback`
