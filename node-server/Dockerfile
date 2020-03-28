FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install deps, capture both package and package-lock
COPY package*.json ./

RUN npm i

# Bundle source code
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"];
