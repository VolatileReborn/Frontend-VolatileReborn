# build stage
<<<<<<< HEAD
# FROM node:14.20.1-slim  as build-stage
FROM node:14.16.0-alpine3.13 AS build-stage
=======
FROM node:14.16.0-alpine3.13 as build-stage
>>>>>>> 30b9c7a4f45684bbff86f85bba7e7d5dccf85a3f
LABEL maintainer="LYK-love"

WORKDIR /app
COPY package*.json ./
<<<<<<< HEAD
RUN node -v && npm -v \
    && npm config set registry http://r.cnpmjs.org/ \
    && npm install 

=======
RUN npm install && vue --version
>>>>>>> 30b9c7a4f45684bbff86f85bba7e7d5dccf85a3f

COPY . .
RUN npm run build



# production stage
# FROM nginx:1.21.5 as production-stage
FROM nginx:1.21.5-alpine as production-stage
RUN nginx -v
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]



# FROM alpine:3.16.2 AS base
# LABEL maintainer="LYK-love"

# RUN echo "http://mirrors.aliyun.com/alpine/edge/main/" > /etc/apk/repositories \
#     && echo "http://mirrors.aliyun.com/alpine/edge/community/" >> /etc/apk/repositories \
#     && apk update \
#     && apk add --no-cache --update nodejs=14.20.0-r0 npm=8.14.0-r0 \
#     && npm config set registry http://r.cnpmjs.org/ --production

# ENV NODE_ENV production


# FROM base AS build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN node -v && npm -v \
#     && npm install 

# COPY . .
# RUN npm run build

# # production stage
# FROM nginx as production-stage
# COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
# COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD [ "nginx","-g","daemon off;" ]
