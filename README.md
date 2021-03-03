# How to start the project

## Start and stop the backend

 1. Go to the backend folder with `cd backend`
 2. Run `docker-compose up`
 3. Wait until all of the services are running
 4. You can connect on the host to the app's database at port 3306, to the Keycloak's database at port 3307. For the credentials please check docker-compose.yml file.
 5. Press Ctrl+C to stop the services
 6. (Optional) if you want to import the latest realm config then run `import_realm.sh`
 7. (Optional) if you've changed the Keycloak's configuration and want to export the latest realm config then run `export_realm.sh` and commit the realm.json file
 8. (Optional) Databases are persisted between `docker-compose up`-s, if you want to reset the DB's to a brand new, clean state then run `docker-compose down`

## Start and stop the frontend

 1. Go to the frontend folder with `cd frontend`
 2. Run `npm install`
 3. Run `npm start`
 4. Press Ctrl+C to stop the dev server

