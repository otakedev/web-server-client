FROM node:14.15-alpine as server-build-deps

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY temp/*.json ./
RUN npm install

COPY temp/* .
RUN npm run build

FROM node:14.15-alpine as server-production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY temp/*.json ./

RUN npm ci --only=production

# Bundle app source
COPY --from=server-build-deps /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
