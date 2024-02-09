FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t im-hungry-app .
# docker run -p 3000:3000 im-hungry-app
# docker run -p 3000:3000 -v ./src:/app/src im-hungry-app
# docker build -t im-hungry-app . && docker run -d -p 3000:3000 --name hungry-app-container -v "$(pwd)":/app im-hungry-app