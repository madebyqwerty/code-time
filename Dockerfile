FROM node:18.12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["sh", "docker-wrapper.sh"]

EXPOSE 3000