#!/bin/bash

function prepare_env() {
    echo -e "============== SERVER =============="
    echo "Enter your server address: "
    read EXPRESS_ADDRESS

    echo "Enter your server port"
    read EXPRESS_PORT

    echo "Enter your JWT secrete"
    read SECRET

    echo "Where do you want to store your server?"
    read SERVER_DIR
    mkdir -p $SERVER_DIR
    cp -r /opt/onelab-sever $SERVER_DIR

    echo -e "============== DATABASE =============="
    
    echo "Enter your database username"
    read MONGO_ROOT_USER

    echo "Enter your database password"
    read MONGO_ROOT_PASSWORD

    echo "Enter your database name"
    read MONGO_INITDB_DATABASE

    echo "Enter your database address"
    read MONGO_ADDRESS

    echo "Enter your database port"
    read MONGO_PORT
    sed -i "s/27010/${MONGO_PORT}/g" $SERVER_DIR/docker-compose.yml

    {
        echo -e "# For MongoDB"
        echo -e "MONGO_ROOT_USER=${MONGO_ROOT_USER}"
        echo -e "MONGO_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}"
        echo -e "MONGO_INITDB_DATABASE=${MONGO_INITDB_DATABASE}"
        echo -e "MONGO_USER=${MONGO_USER}"
        echo -e "MONGO_PASSWORD=${MONGO_PASSWORD}"
        echo -e "# For Express server"
        echo -e "MONGO_ADDRESS=${MONGO_ADDRESS}"
        echo -e "MONGO_PORT=${MONGO_PORT}"
        echo -e "EXPRESS_ADDRESS=${EXPRESS_ADDRESS}"
        echo -e "EXPRESS_PORT=${EXPRESS_PORT}"
        echo -e "# Secret"
        echo -e "SECRET=${SECRET}"
    } > $SERVER_DIR/.env

}
