FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10533

CMD [ "npm", "run", "final" ]