#!/bin/bash

# ~stolen~ borrowed from here https://docs.docker.com/config/containers/multi-service_container/

./pocketbase-server serve --http 0.0.0.0:80

# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?