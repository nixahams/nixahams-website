# Use Node 18 with full Linux instead of Alpine
FROM node:18

WORKDIR /frontend

# Install dependencies first (better caching)
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

COPY . .

# Build the app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

EXPOSE 5173

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"] 