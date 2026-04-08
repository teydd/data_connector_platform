# Use official Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first (for caching)
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the project files
COPY . .

# Expose port 3001 because i have a server (Caprover) running in port 3000
EXPOSE 3001

# Run Next.js dev server
CMD ["pnpm", "dev", "--webpack"]
