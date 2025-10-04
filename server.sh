#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
fi

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install node
nvm use node
nvm alias default node

until command -v node >/dev/null 2>&1; do
  echo "Waiting for Node.js..."
  sleep 1
done
echo "Node.js version: $(node -v)"

npm install -g pm2@latest
echo "PM2 version: $(pm2 -v)"

npm i
npm run build

pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs
echo "Webhook handler up and running"
