# Use Node.js 20 slim image
FROM node:20-slim

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application with increased memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build

# Expose the port
EXPOSE 3131

# Set environment variables for Nitro
ENV NITRO_PORT=3131
ENV NITRO_HOST=0.0.0.0

# Start the application
CMD ["node", ".output/server/index.mjs"]
