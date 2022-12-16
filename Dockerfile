FROM node:18.12-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["node", "build"]

EXPOSE 3000