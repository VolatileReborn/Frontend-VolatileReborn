# build stage
# FROM node:14.20.1-slim  as build-stage
FROM node:14.16.0-alpine3.13 AS build-stage
LABEL maintainer="LYK-love"
WORKDIR /app
COPY package*.json ./
RUN node -v && npm -v \
    && npm config set registry https://registry.npm.taobao.org \
    && npm install
COPY . .
RUN npm run build

# # FROM node:14.16.0-alpine3.13 AS build-stage
# FROM node:14.20.1-slim as build-stage
# LABEL maintainer="LYK-love"
# ENV NODE_ENV production

# WORKDIR /app
# COPY package*.json ./
# RUN node -v && npm -v \
#     && npm config set registry https://registry.npm.taobao.org \
#     && npm install
# COPY . .
# RUN npm run build


# production stage
FROM nginx as production-stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]


