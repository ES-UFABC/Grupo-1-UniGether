FROM node:current-alpine3.14

COPY package.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]