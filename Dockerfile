FROM node:carbon

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /home/jack/workspace/comroads/monitor-fe

# Copy dependency definitions
COPY package.json ./

# Install dependecies
RUN npm install --only=production

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 80

# Serve the app
CMD ["npm", "start"]
