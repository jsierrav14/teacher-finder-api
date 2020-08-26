FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 8080
RUN npm config set python /usr/bin/python
RUN npm i -g npm
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN npm run build
CMD ["npm", "start"]