FROM node:19-alpine AS build
WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build
RUN npm install -g serve
CMD ["npx","serve","-s","dist"]

FROM nginx:stable-alpine
COPY --from=build /front/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]