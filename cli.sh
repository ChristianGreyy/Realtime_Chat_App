# Sequelize
npm install --save @nestjs/sequelize sequelize sequelize-typescript pg-hstore pg
npm install --save-dev @types/sequelize
npm install --save-dev sequelize-cli

# Dotenv
npm i @nestjs/config
npm install dotenv --save

# Passport
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

# Bcrypt
npm install bcrypt --save

# Jwt
npm install --save @nestjs/jwt jsonwebtoken

# Socket
npm i --save @nestjs/websockets @nestjs/platform-socket.io

# validation
npm i --save class-validator class-transformer

# migration
npx sequelize-cli model:generate --name User --attributes email:string,password:string,first_name:string,last_name:string
npx sequelize-cli model:generate --name Conversation --attributes text:string,is_read:boolean
npx sequelize-cli model:generate --name Channel --attributes name:string
npx sequelize-cli model:generate --name Channel_User 
npx sequelize-cli model:generate --name Message --attributes text:string,is_read:boolean








