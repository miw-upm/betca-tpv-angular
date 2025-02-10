# Etapa de construcción
FROM node:22.13.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-prod
RUN npm install -g serve

# Etapa de runtime, recomendable: nginx
FROM node:22.13.1-alpine
WORKDIR /app
COPY --from=build /app/dist/betca-tpv-angular /app
RUN npm install -g serve
EXPOSE 10000
CMD ["serve", "-s", "-l", "10000", "/app"]

#
#> docker build -t betca-tpv-angular-prod .
#> docker run -d -p 8080:10000 --name betca-tpv-angular-prod-app betca-tpv-angular-prod
