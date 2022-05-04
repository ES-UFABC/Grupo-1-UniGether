FROM node:current-alpine3.14 AS build
WORKDIR /usr/frontend
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/frontend/dist/frontend /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'