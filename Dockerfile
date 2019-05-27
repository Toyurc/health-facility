# Stage 1 for adding docker to a react app
FROM node:10.12-alpine

WORKDIR /app

COPY . ./

RUN yarn
 
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]