FROM node:10

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD npm run devstart
