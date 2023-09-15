#!/bin/bash

set -m # to make job control work

cd /app/backend
gunicorn -w 1 'blog:app' -b 127.0.0.1:5000 &

cd /app/frontend
npm start &

fg %1 # gross!