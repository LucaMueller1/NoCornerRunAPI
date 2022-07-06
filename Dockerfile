FROM node:16.15-alpine3.14
COPY . .
RUN npm i
EXPOSE 3000
CMD [ "node", "--max-old-space-size=2048", "bin/www" ]