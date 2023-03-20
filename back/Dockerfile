FROM node:19-alpine AS build
WORKDIR /back
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN chmod +x assignENV.sh
RUN ./createENV.sh database-url token-secret cookie-name 
RUN npx prisma migrate deploy
RUN yarn run build
EXPOSE 8080
CMD ["yarn", "dev"]
