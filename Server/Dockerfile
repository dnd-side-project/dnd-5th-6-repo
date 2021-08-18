FROM node:12
# Create App Directory
WORKDIR /app
COPY package*.json ./
RUN echo "Docker Container Start!!"
RUN npm install
COPY . .
EXPOSE 3000


#CMD ["node", "index.js"]
