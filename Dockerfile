FROM node:18.2.0
WORKDIR /acme-app
COPY package.json /acme-app
RUN npm install
COPY . /acme-app
CMD ["npm", "start"]
