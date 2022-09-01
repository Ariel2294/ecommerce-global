FROM node:16-alpine

ARG NODE_ENV
ARG PORT=3333

WORKDIR /app

COPY dist/ ./dist
COPY package*.json ./

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV HUSKY_SKIP_INSTALL=1

RUN npm ci --prod \
    && rm -Rf ~/.cache ~/.npm


EXPOSE $PORT

CMD ["npm", "run", "start:prod"]