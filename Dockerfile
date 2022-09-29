# build stage
FROM node:14.16.0-alpine3.13 as build-stage
LABEL maintainer="LYK-love"

WORKDIR /app
COPY package*.json ./
RUN npm install && vue --version

COPY . .
RUN npm run build



# production stage
FROM nginx as production-stage
LABEL maintainer="LYK-love"
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]


