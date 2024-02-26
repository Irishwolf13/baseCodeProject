# Step 1: Use an official Node base image
FROM node:16-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# (Optional) If you're using yarn, copy yarn.lock and use yarn install instead:
# COPY yarn.lock ./
# RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of your app's source code
COPY . .

# Build your app for production (creates a build folder)
RUN npm run build

# Stage 2: Serve the app using serve
FROM node:16-alpine

# Install serve - a static file serving utility.
RUN npm install -g serve

# Set the working directory to serve the build folder
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/build .

# Step 6: Expose the port that serve uses (by default 5000)
EXPOSE 5000

# Step 7: Serve the static files
CMD ["serve", "-s", "."]
