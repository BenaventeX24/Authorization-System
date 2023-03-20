FROM node:19-alpine AS build

WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN chmod +x assignENV.sh
RUN ./createENV.sh api-endpoint refresh-token-endpoint
RUN yarn run build

FROM nginx:1.23.3-alpine
COPY --from=build /front/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]