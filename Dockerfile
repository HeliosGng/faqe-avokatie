# Stage 1: Build assets using a Node Alpine environment
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Use npm install to prevent failures from minor package-lock.json mismatches during automatic deploys
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve using our light-weight production runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 8080

CMD ["node", "server.js"]
