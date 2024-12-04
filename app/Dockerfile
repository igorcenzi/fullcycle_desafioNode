FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 3000

CMD ["wait-for-it.sh", "db:3306", "--", "npm", "start"]
