#!/bin/bash

echo -e "Starting database...\n"
cd db
bash start.sh

echo -e "\n\nStarting dev server...\n"
cd ../web
bash start.sh
