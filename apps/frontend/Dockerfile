FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Copy package*.json to WORKDIR
COPY ./apps/frontend/package*.json .

# Install dependencies
RUN npm i

# Copy source code files to WORKDIR
COPY ./apps/frontend/ .

EXPOSE 3000


# === Development
FROM base AS dev

CMD ["npm", "run", "dev"]


# === Production
FROM base AS prod

# Embed libs from root to container
COPY ./libs/ ./libs

# Build Nuxt app 
RUN npm run build

# Run Nuxt app
CMD ["node", ".output/server/index.mjs"]