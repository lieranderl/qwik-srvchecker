FROM node:23-bookworm-slim AS build

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
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3333
ENV NODE_ENV=production
WORKDIR /var/task
COPY --from=build /app/node_modules /var/task/node_modules
COPY --from=build /app/server /var/task/server
COPY --from=build /app/dist /var/task/dist
COPY --from=build /app/package.json /var/task/package.json
COPY --from=build /app/public /var/task/public

# Exposing server port
EXPOSE $PORT
CMD [ "bun", "run", "serve" ]
