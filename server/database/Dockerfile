FROM node:18.12.1-bullseye-slim

# App folder (avoid installing into /)
WORKDIR /usr/src/app

# Copy only package.json first so Docker caching behaves correctly
COPY package.json ./

# Clean install (forces a fresh download if cache was weird)
RUN npm cache clean --force && npm install --production --force

# Now copy the rest of the service
COPY . .

EXPOSE 3030
CMD ["node", "app.js"]
