# Step 1: Use an official Node.js runtime as a base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port the app runs on (default: 3000)
EXPOSE 8080

# Step 7: Define the command to run the application
CMD ["npm", "run", "start"]
