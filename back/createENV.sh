#!/bin/sh

# Define the path to the environment file
ENV_FILE="./.env"

# Write the values to the environment file
echo "AUTHSYS_DATABASE_URL='${1}'" >>"$ENV_FILE"
echo "AUTHSYS_TOKEN_SECRET='${2}'" >>"$ENV_FILE"
echo "AUTHSYS_COOKIE_NAME='${3}'" >>"$ENV_FILE"
