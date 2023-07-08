FROM node:16.16.0


WORKDIR /app
COPY package* ./


ENV DATABASE_URL="mongodb+srv://pos-system-user:8segeZbfaDv6aAjr@principal-database.apwmnzs.mongodb.net/pos"

ENV NODE_ENV="production"
ENV JWT_SECRET="70E01BB62F171B00D6222A"
ENV PORT="3333"

RUN npm install -g tsup

RUN npm install
COPY . .
RUN npm run build
EXPOSE 3333
CMD ["npm", "start"]
