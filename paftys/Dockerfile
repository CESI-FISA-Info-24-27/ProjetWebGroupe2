FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

#https://github.com/npm/cli/issues/4828
RUN rm -rf node_modules package-lock.json

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
