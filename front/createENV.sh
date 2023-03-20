#!/bin/sh

# Define the path to the environment file
ENV_FILE="./.env"

# Write the values to the environment file
echo "VITE_SERVER_URL='${1}'" >>"$ENV_FILE"
echo "VITE_SERVER_REFRESH_TOKEN='${2}'" >>"$ENV_FILE"
