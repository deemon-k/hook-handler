# Basic server for handling webhooks (e.g Github)

It's a tiny webserver based on Hono, executes file named ci.sh in root directory of server

## Installation & Usage

Just clone this repo and execute server.sh
Then create shell script in a root directory

after POST request to http://YOUR-IP:8789/hooks/deploy it will run script that you create
