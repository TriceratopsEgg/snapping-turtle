FROM node:12-alpine AS alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Add Tini - allows for the node applciation to respond to SIGTERM (CTRL-C)
RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# Assert that our apps working directory exists and that we own it
RUN mkdir -p /usr/src/app && chown node /usr/src/app
WORKDIR /usr/src/app

FROM alpine as build

# Prevents a wall of debug messages during bluebird install
ENV BLUEBIRD_DEBUG=0

#ARG NPM_TOKEN=
#ENV NPM_TOKEN=${NPM_TOKEN}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./package*.json ./

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm ci --no-optional --quiet --no-progress

# Copy in our source code, and make sure we own it
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./config ./config

FROM alpine as production

# Periodically check that the server is alive and health
#HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=10 \
#    CMD node ./src/healthcheck.js

COPY --from=build --chown=node:node /usr/src/app/package*.json ./
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/src ./src
COPY --from=build --chown=node:node /usr/src/app/public ./public
COPY --from=build --chown=node:node /usr/src/app/config ./config

# Delete the .test.js files and the .http files

# We should always end on the "node" user, images should not run as the root user
USER node
EXPOSE 7031
CMD [ "npm", "start" ]


