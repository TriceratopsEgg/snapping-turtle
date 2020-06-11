FROM node:12-alpine AS test

ARG TEAMCITY_VERSION
ENV TEAMCITY_VERSION=${TEAMCITY_VERSION}

ENV NODE_ENV=test
ENV CI=true

ARG NPM_TOKEN=
ENV NPM_TOKEN=${NPM_TOKEN}

RUN mkdir -p /usr/src/tracking-api && chown node /usr/src/tracking-api

# Create app directory
WORKDIR /usr/src/tracking-api

COPY --chown=node:node ./.npmrc ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./package*.json ./

RUN npm ci --quiet --no-progress

# Copy in the source code
COPY  --chown=node:node . .

RUN npm audit
# run 'npm audit fix' on your development to try resolve

# RUN npm run lint

# RUN npm test