FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=node /app/dist/tools-project /usr/share/nginx/html
EXPOSE 80