FROM node:19-alpine AS build
WORKDIR /back
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build

FROM node:19-alpine AS production
COPY --from=build /front/dist /front
CMD ["node","index.js"]
