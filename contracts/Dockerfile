FROM node:lts-alpine

# make the frontend folder the current working directory
WORKDIR ./

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm ci

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080
CMD [ "npx", "hardhat", "node" ]
