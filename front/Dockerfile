FROM node:19-alpine AS build
ENV VITE_SERVER_URL http://localhost:8080/api
ENV VITE_SERVER_REFRESH_TOKEN http://localhost:8080/api/refresh-token
EXPOSE 3000

WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

RUN yarn run build
RUN echo envariable: $VITE_SERVER_URL
CMD ["npx","vite","serve","dist"]