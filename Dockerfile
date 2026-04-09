# Use official Node.js image
FROM node:20

# Create a non-root user to avoid running as root
RUN useradd -ms /bin/bash appuser

# Set working directory inside container
WORKDIR /app

# Give ownership of /app to appuser so they can write here
RUN chown -R appuser:appuser /app

# Install pnpm globally as root
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first (for caching)
COPY --chown=appuser:appuser package.json pnpm-lock.yaml* ./

# Switch user to the non-root user
USER appuser

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the project files
COPY --chown=appuser:appuser . .

# Expose port 3001 because CapRover uses 3000
EXPOSE 3001

# Run Next.js dev server
CMD ["pnpm", "dev", "--webpack"]
