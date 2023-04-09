#!/bin/bash

docker build . -t europe-central2-docker.pkg.dev/gpt-todo-383211/gpt-todo/api -f apps/api/Dockerfile --platform linux/amd64

docker push europe-central2-docker.pkg.dev/gpt-todo-383211/gpt-todo/api