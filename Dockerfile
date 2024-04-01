FROM node:18-alpine AS build
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
EXPOSE 8080
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html