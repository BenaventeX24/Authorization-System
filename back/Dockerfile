FROM node:19-alpine AS build
WORKDIR /back
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN npx prisma generate
RUN yarn run build
EXPOSE 8080
CMD ["node", "dist/index.js"]