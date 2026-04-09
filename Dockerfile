# Use official Node.js image
FROM node:20

#A non user to prevent running the project in the root of the computer
RUN useradd -ms /bin/bash appuser

# Set working directory inside container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

#Switch user to the non-root user
USER appuser

# Copy package.json and pnpm-lock.yaml first (for caching)
COPY --chown=appuser:appuser package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the project files
COPY --chown=appuser:appuser . .

# Expose port 3001 because i have a server (Caprover) running in port 3000
EXPOSE 3001

# Run Next.js dev server
CMD ["pnpm", "dev", "--webpack"]
