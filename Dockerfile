FROM node:15-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ./public /app
RUN npm install -g derver

EXPOSE 7878

CMD ["derver","--production","--port=7878"]