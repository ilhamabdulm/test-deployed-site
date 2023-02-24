FROM node:18.12.1

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm ci

# Build the application
RUN npm run build

# Copy built files from the build stage
COPY ./dist/client /app

EXPOSE 5173

CMD ["npm", "run", "start", "--", "--host"]



# This version works, but build the whole thing
# FROM node:18.12.1

# WORKDIR /app

# # Setup a path for using local npm packages
# RUN mkdir -p /opt/node_modules

# COPY ./package.json /app
# COPY ./package-lock.json /app

# RUN npm ci

# COPY ./ /app

# RUN npm run build
# # server build needs to run after client build because the client build using Vite
# # removes the dist/ folder before compiling its code

# EXPOSE 5173

# CMD ["npm", "run", "start", "--", "--host"]






# # Use an official Node.js runtime as the base image
# FROM node:18.12.1 AS build

# # Set the working directory
# WORKDIR /app

# # Copy the entire app directory
# COPY . .

# # Install dependencies
# RUN npm install

# # Build the application
# RUN npm run build

# # Use a lightweight runtime as the final image
# FROM node:18.12.1

# # Set the working directory
# WORKDIR /app

# # Copy built files from the build stage
# COPY --from=build /app/dist ./
# COPY --from=build /app/node_modules ./
# COPY --from=build /app/package*.json ./

# RUN npm install -g vite

# # Expose the port the application will run on
# EXPOSE 5173

# # Start the application
# CMD ["npm", "run", "start", "--", "--host"]








# # Use an official Node.js runtime as the base image
# FROM node:18.12.1

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # # Expose the port the application will run on
# # EXPOSE 5173

# # Start the application
# CMD ["npm", "run", "start", "--", "--host"]
