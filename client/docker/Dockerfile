FROM node:14.15-alpine as client-build-deps

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY temp .
RUN npm install
RUN npm run build

FROM node:14.15-alpine as client-production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY api/ .

RUN npm ci --only=production

# Bundle app source
COPY --from=client-build-deps /usr/src/app/build ./build

EXPOSE 4200
CMD ["node", "./server.js"]
