FROM node:16-alpine3.14
WORKDIR /api
COPY . .
RUN npm uninstall bcrypt
RUN npm install bcrypt

CMD ["node", "build/server.js"]