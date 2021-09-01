FROM node:latest

WORKDIR /

COPY package*.json ./
COPY . .
COPY database.json .
COPY .env .

RUN npm install
RUN npm run build
RUN npm run config
RUN npm run migrate

EXPOSE 3000

CMD [ "npm", "run", "watch" ]