FROM node:19-alpine AS build
ENV AUTHSYS_DATABASE_URL postgresql://badmin:badmin2211@192.168.1.11:5432/bes
ENV AUTHSYS_TOKEN_SECRET BenaventeAuthSystem
ENV AUTHSYS_COOKIE_NAME __Secure-1lcb
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
