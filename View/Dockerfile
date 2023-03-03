FROM node:18.14.2

WORKDIR /var/www/html/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD ["npm", "run", "host"]