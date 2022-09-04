FROM node:16-alpine as builder

WORKDIR /app/builder
COPY . .
RUN npm install
RUN npm install -g @nestjs/cli
RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/builder/dist ./dist
COPY --from=builder /app/builder/package.json ./

RUN npm install --prod

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]