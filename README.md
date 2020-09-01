
<h1 align="center">
  AD Marketplace API
</h1>

<p align="center">

  <a href="https://www.linkedin.com/in/augusto-vin%C3%ADcius-vasconcelos-tabosa-71aa991a5/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-adoidadox2-%23FF9000">
  </a>
</p>

## About the project :open_file_folder::
Simple API for advertising and selling ads. Where you can post an ad or send a purchase intention by email. Made just for practice :)



## Technologies :rocket::

Technologies that I used to develop this API  (used soft delete)

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://github.com/redis/redis)
- [JWT](https://jwt.io/)
- [Helmet](https://helmetjs.github.io/)
- [Kue](https://github.com/Automattic/kue)
- [Cors](https://github.com/expressjs/cors)
- [Nodemailer](https://nodemailer.com/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)


## Directories tree 

    .
    ├── src
	│   ├── config
	│   ├── controllers
	│   ├── database
	│   │   └── migrations
	│   ├── dtos
	│   ├── errors
	│   ├── jobs
	│   ├── middlewares
	│   ├── models
	│   ├── repositories
	│   ├── routes
	│   ├── services
	│   ├── @types
	│   └── views
	│       └── emails
	│           ├── partials

### Inside the project  -
- **User**: Represents a user, who can advertise and buy ads
- **Ad**: Represents an ad, which can be purchased
- **Purchase**: Represents a purchase intention a user has for a posted ad
- **Sale**: Represents a sale, when a user accepts a purchase intention for one of your ads

### Environment variables -
- **NODE_ENV**: Defines the environment  (Ex.: development / production)
- **PORT**: Defines the port on which the application runs (Ex.: 3333)
-  **APP_SECRET**: Defines the secret of the application, which guarantees the uniqueness of the tokens (Ex.:asdybhq47qrdb)    
-  **APP_TTL**: Defines the time of validity of a token (Ex.: 1d) 
- **DB_TYPE**: Defines the type of database (Ex.: postgres)
- **DB_HOST**: Defines the host of database (Ex.: localhost)
- **DB_PORT**: Defines the port of database (Ex.: 5432)
- **DB_USERNAME**: Defines the username of database (Ex.: admin)
- **DB_PASSWORD**: Defines the password of database (Ex.: admin123)
- **DB_NAME**: Defines the name of database (Ex.: marketplace-api)
- **REDIS_HOST**: Defines the host of redis (Ex.: 127.0.0.1)
- **REDIS_PORT**: Defines the port of redis (Ex.: 6379)
- **MAIL_HOST**: Defines the host of SMTP server (Ex.: smtp.mailtrap.io)
- **MAIL_PORT**: Defines the port of SMTP server  (Ex.: 2525)
- **MAIL_USERNAME**: Defines the username of SMTP server (Ex.: a547ww)
- **MAIL_PASSWORD**: Defines the password of SMTP server (Ex.: 5948wtgh)


## Getting started :desktop_computer::

Import the `Insomnia.json` on Insomnia App

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)
- One instance of [Redis](https://redis.io/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/adoidadox2/marketplace-api.git && cd marketplace-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name marketplace-api-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=marketplace-api -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d -t postgres

# Create the instance of Redis using docker
$ docker run --name marketplace-api-redis -p 6379:6379 -d -t redis:alpine

# Once the services are running, run the migrations
$ yarn typeorm migration:run

```
To start the server in a **development** environment: 

    $ yarn dev:server

To start the server in a **production** environment: 

    #To transpile from Typescript to Javascript
    $ yarn build
    
    #To run the server already transpiled
	$ yarn start

### Comments -
- All ID's are uuid
- Handled errors return their `HTTP status` and a specific error message. ** Ex ** .: `{"status": "error", "message":" Ad not found "}`
- Unexpected errors are treated as `status 500 - Internal Server Error`

## How to contribute :thinking::

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork adoidadox2/marketplace-api
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd marketplace-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## License :memo::

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author :man_technologist::

Made with :heart: by **Augusto Vinícius** 👋🏻 [Get in touch!](https://github.com/adoidadox2)
