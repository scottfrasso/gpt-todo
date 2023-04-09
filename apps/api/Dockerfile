# Stage 1: Build the NestJS application
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json, yarn.lock and the workspaces configuration files
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

# Copy the dependencies 
COPY libs/dtos/ ./libs/dtos/
COPY libs/llm/ ./libs/llm/
COPY libs/logging/ ./libs/logging/

# Copy the rest of the application code
COPY apps/api/ ./apps/api/

# Install dependencies
RUN yarn install

# Build the dependencies
RUN yarn workspace @gpt-todo/dtos build
RUN yarn workspace @gpt-todo/llm build
RUN yarn workspace @gpt-todo/logging build

# Build the application
RUN yarn workspace @gpt-todo/api build

# Stage 2: Deploy the application with a distroless Node.js 18 image
FROM gcr.io/distroless/nodejs:18

# Copy the built application and node_modules from the builder stage
#COPY --from=builder /app/libs/llm/build/ /app/libs/dtos/build/
#COPY --from=builder /app/libs/llm/build/ /app/libs/llm/build/
#COPY --from=builder /app/libs/logging/build/ /app/libs/logging/build/

#COPY --from=builder /app/apps/api/dist/ /app/apps/api/dist/
#COPY --from=builder /app/apps/api/node_modules/ /app/apps/api/node_modules/
#COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app /app


# Set the working directory
WORKDIR /app

USER nonroot

# Set the environment variable to specify the main file
#ENV NODE_ENV=productio
ENV PORT=3000

# Expose the port your application will run on
EXPOSE 3000

USER nonroot

# Start the application
CMD ["apps/api/dist/main.js"]
