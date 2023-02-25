FROM node:18.14.2

WORKDIR /orm

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4466

EXPOSE 4466

CMD ["npm", "run", "start"]