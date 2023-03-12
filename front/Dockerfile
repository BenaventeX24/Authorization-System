FROM node:19-alpine AS build
WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build
RUN npm install -g serve
CMD ["npx","serve","-s","dist"]

#FROM node:19-alpine AS serve
#RUN mkdir front
#WORKDIR /front
#RUN mkdir dist
#COPY --from=build /front/dist /front/dist
#EXPOSE 3000
#RUN yarn global add vite
#CMD ["npx","vite","preview","dist","--port","3000"]

FROM nginx:stable-alpine
COPY --from=build /front/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]