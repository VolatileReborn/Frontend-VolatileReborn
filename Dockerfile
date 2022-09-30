# 使用alpine-linux, 极致精简

FROM alpine:3.13 AS base
LABEL maintainer="LYK-love"

# RUN echo "http://mirrors.aliyun.com/alpine/edge/main/" > /etc/apk/repositories \
#     && echo "http://mirrors.aliyun.com/alpine/edge/community/" >> /etc/apk/repositories \
RUN apk update \
    && apk add --no-cache --update nodejs=14.20.0-r0 npm=14.20.0-r0 \
    && npm config set registry http://r.cnpmjs.org/ --production


FROM base AS build-stage
WORKDIR /app
COPY package*.json ./
RUN node -v && npm -v \
    && npm install 

COPY . .
RUN npm run build

# production stage
FROM nginx:1.21.5-alpine as production-stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]

