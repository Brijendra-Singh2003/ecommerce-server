FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY prisma/ prisma/
RUN npm run generate

COPY src/ src/
COPY tsconfig.json ./
COPY types.d.ts ./

RUN npm run build

USER node

CMD [ "npm", "start" ]

EXPOSE 3000