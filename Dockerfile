# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:20-bookworm-slim AS build

# Setting up the work directory
WORKDIR /app
RUN npm install -g bun

# Declaring env
ENV NODE_ENV=production
# COPY package.json
COPY package.json /app
# Installing dependencies
RUN bun install
RUN bun update
# Copying all the files in our project
COPY . /app
RUN bun run build
# Stage 2
FROM oven/bun
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/server /app/server
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/public /app/public

# Exposing server port
EXPOSE 3000
