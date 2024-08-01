# Build steps
FROM oven/bun:1-alpine AS build
ARG VERSION
WORKDIR /app
COPY package*.json ./
RUN bun install
RUN bun install --production
COPY ./ /app/
ENV VERSION=${VERSION:-develop}
RUN echo "VITE_VERSION=${VERSION}" > .env
RUN bun run build

# Run steps
FROM nginx:1-alpine
ARG VERSION
ENV VERSION=${VERSION:-develop}
RUN echo ${VERSION} > version
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

