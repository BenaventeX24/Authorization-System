FROM node:19-alpine AS build
WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx
COPY --from=build /front/dist /usr/share/nginx/html
#RUN apt-get update && apt-get install -y gnupg2 curl
#RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
#RUN apt-get install -y nodejs
#RUN npm install --global yarn
#WORKDIR /front
WORKDIR /usr/share/nginx/html
ENTRYPOINT ["nginx","-g","daemon off;"]