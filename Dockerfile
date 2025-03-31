FROM node:22.14.0

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY entrypoint.sh /usr/src/app/entrypoint.sh

RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 8081

ENV NODE_ENV=production

ENTRYPOINT ["sh", "./entrypoint.sh"]
