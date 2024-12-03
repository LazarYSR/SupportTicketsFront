# Étape de construction
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build pour une application frontend (si nécessaire)
RUN npm run build

# Étape de production
FROM node:18

WORKDIR /app

COPY --from=build /app .

EXPOSE 4000

# Démarrer l'application
CMD ["npm", "start"]
