
FROM alpine:3.16.2 AS base
LABEL maintainer="LYK-love"
# RUN sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories && \
#     apk add --no-cache nodejs=14.16.0-r0 && \
#     apk add --no-cache npm=14.16.0-r0 && \
# RUN apk add --no-cache --update nodejs=16.17.0-r0
RUN echo "http://mirrors.aliyun.com/alpine/edge/main/" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/edge/community/" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache --update nodejs=14.17.4-r0 npm \
    && node -v && npm -v \
    && npm config set registry https://registry.npm.taobao.org --production

ENV NODE_ENV production


RUN node --version
RUN npm --version


FROM base AS build-stage
WORKDIR /app
COPY package*.json ./

# RUN npm install  --registry=https://registry.npm.taobao.org 

RUN vue --version

COPY . .
RUN npm run build

# production stage
FROM nginx as production-stage
LABEL maintainer="LYK-love"
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]


# # build stage
# FROM node:14.20.1-slim as build-stage

# RUN node --version
# RUN npm --version

# LABEL maintainer="LYK-love"
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --registry=https://registry.npm.taobao.org

# RUN vue --version

# COPY . .
# RUN npm run build



# # production stage
# FROM nginx as production-stage
# LABEL maintainer="LYK-love"
# COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
# COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD [ "nginx","-g","daemon off;" ]


