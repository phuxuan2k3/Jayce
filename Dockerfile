FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i  @types/node

RUN npm i -g serve

COPY . .


CMD [ "npm", "run", "dev" ]


# RUN npm run build


# CMD [ "serve", "-s", "dist" ]
