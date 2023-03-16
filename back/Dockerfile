FROM node:19-alpine AS build
#ENV AUTHSYS_DATABASE_URL
#ENV AUTHSYS_TOKEN_SECRET 
#ENV AUTHSYS_COOKIE_NAME
WORKDIR /back
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN npx prisma generate
RUN yarn run build
EXPOSE 8080
CMD ["node", "dist/index.js"]

#FROM node:19-alpine AS production
#COPY --from=build /back/dist /api
#RUN yarn add global tsconfig-paths
#EXPOSE 8080
#CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]
