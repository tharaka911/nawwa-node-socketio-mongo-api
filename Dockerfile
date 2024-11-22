ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV=production

# Define build arguments
ARG JWT_SECRET
ARG MONGO_URI
ARG PORT

# Set environment variables
ENV JWT_SECRET=$JWT_SECRET
ENV MONGO_URI=$MONGO_URI
ENV PORT=$PORT

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

#copy the .env file to workdir
#COPY .env .

# Expose the port that the application listens on.
EXPOSE 9005
