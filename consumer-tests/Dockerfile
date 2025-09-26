FROM node:18-slim

WORKDIR /usr/src/consumer-tests

# Install OS deps for potential native builds (kept minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
	ca-certificates \
	curl \
	build-essential \
	python3 \
	git \
 && rm -rf /var/lib/apt/lists/*

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

RUN npm ci --no-audit --no-fund

# Copy the rest of the consumer-tests files
COPY . .

# Make npm the entrypoint so arguments passed to `docker run ... <arg>` are forwarded
# Example: `docker compose run --rm consumer-tests test` -> runs `npm test`
ENTRYPOINT ["npm", "run"]

