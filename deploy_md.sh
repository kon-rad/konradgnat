#!/bin/bash

# Only updates git changes and restarts server
cd konradgnat_com/
sudo git pull

# start virtual env, update requirements, rebuild app

virtualenv .
source bin/activate

# restarts gunicorn, resets .sock
sudo systemctl daemon-reload
sudo systemctl restart konradgnat
deactivate
