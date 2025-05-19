# FROM nginx:alpine
# COPY dist /usr/share/nginx/html

FROM node:22.13.1-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]