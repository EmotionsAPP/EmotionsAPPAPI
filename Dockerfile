
# ================> Dependencies Installation <================
FROM node:16-slim AS deps
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile --network-timeout 1000000

# ================> Application Build <================
FROM node:18-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# ================> Application Runner <================
FROM node:18-slim AS runner
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --prod --network-timeout 1000000
COPY --from=builder /app/dist ./dist

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

CMD [ "node", "dist/main" ]
