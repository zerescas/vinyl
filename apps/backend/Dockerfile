# === Base
FROM node:20-slim AS base

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install nedded packages for Prisma CLI
RUN apt-get update -y 
RUN apt-get install -y openssl procps

# Set working directory
WORKDIR /app

# Set pnpm store location
RUN pnpm config set store-dir /pnpm/store --global

# Copy package*.json to WORKDIR
COPY ./apps/backend/package*.json .

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i

# Copy source code files to WORKDIR
COPY ./apps/backend/ .

EXPOSE 9000


# === Development
FROM base AS dev

# Prepare and run app in development mode 
CMD ["./start-dev.sh"]


# === Production
FROM base AS prod

# Embed libs from root to container
COPY ./libs/ ./libs

# Prepare and run app in production mode 
CMD ["./start-prod.sh"]