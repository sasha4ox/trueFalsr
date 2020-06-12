# Run front-end as development
git clone https://github.com/sasha4ox/trueFalsr.git
cd client
yarn
yarn start

# FOR PRODUCTION

## First step
sudo npm install -g pm2
git clone https://github.com/sasha4ox/trueFalsr.git
cd trueFalsr
##  Second step

Change apiUrl on a folder client/src/client-config.js 

##  Third step
npm install 
> **Note:** For installing server packages

npm run client:install

> **Note:** For installing fron-end packages

npm run client:build
> **Note:** For builds the app for production to the `build` folder. 

##  Fourth step

pm2 start npm -- start
