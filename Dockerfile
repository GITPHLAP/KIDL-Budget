# Build steps
FROM oven/bun:1.1.38-alpine AS build
ARG VERSION
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY bun.lockb ./
RUN bun install
RUN bun install --production
COPY ./ /app/
ENV VERSION=${VERSION:-develop}
RUN echo "VITE_VERSION=${VERSION}" > .env
RUN bun run build

# Run steps
FROM nginx:1.27.2-alpine
ARG VERSION
ENV VERSION=${VERSION:-develop}
RUN echo ${VERSION} > version
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

