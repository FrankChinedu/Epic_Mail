# Epic_Mail

[![Build Status](https://travis-ci.com/FrankChinedu/Epic_Mail.svg?branch=develop)](https://travis-ci.com/FrankChinedu/Epic_Mail)

[![Maintainability](https://api.codeclimate.com/v1/badges/a8a3d82521d45a6701e7/maintainability)](https://codeclimate.com/github/FrankChinedu/Epic_Mail/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a8a3d82521d45a6701e7/test_coverage)](https://codeclimate.com/github/FrankChinedu/Epic_Mail/test_coverage)

[![Coverage Status](https://coveralls.io/repos/github/FrankChinedu/Epic_Mail/badge.svg?branch=coverage-test)](https://coveralls.io/github/FrankChinedu/Epic_Mail?branch=coverage-test)



Epic mail is a web app that helps people exchange
messages/information over the internet.

## Built with LOVE and
 - Html
 - Css
 - Javascript
 - Nodejs

## Feature
- Guest can create an account
- User can sign in
- User can send an email
- User can view inbox messages
- User can view unread inbox messages
- User can view sent messages
- User can view a particular inbox message
- User can delete a particular inbox message


## Gh pages
[home](https://frankchinedu.github.io/Epic_Mail/UI/index.html)

## Gh pages login data 
```
 - username : anything@mail.com
 - password : anything
```

## Pivotal Tracker
  [url](https://www.pivotaltracker.com/n/projects/2315126)

## Link to API documentation
 - [docs](/api-docs)

## How to clone project 
 - git clone https://github.com/FrankChinedu/Epic_Mail.git
 - cd Epic_Mail
 - npm install ( to install dependencies )
 - npm start ( to start server)

## To test project
```
npm test  to run test
```
## Routes (api - end points)
 (properly stated in the documentation)

- POST  /api/v1/auth/signup - create new User

- POST /api/v1/auth/login - Sign in user

- POST /api/v1/messages - create or send email

- GET /api/v1/messages/sent - get all user's sent messages

- GET /api/v1/messages - get all user's inbox messages

- GET /api/v1/messages/:id - view a particular email from the inbox messages

- GET /api/v1/messages/unread - get all user's unread messages

- DELETE /api/v1/messages/:id - delete a message from the inbox

## Project References
 - - -
#### UI reference
 - gmail (I used gmail mock up UI for my UI)
 - whatsapp (I used whatsapp interface as inspiration for my responsive version on smaller screens )
- - -
#### Swagger 
 - https://itnext.io/wiring-up-an-api-server-with-express-and-swagger-9bffe0a0d6bd

#### Server
 - thanks to Rexben for letting me use his project as reference https://github.com/Rexben001/Politico

---
## Author

- ##### OBI CHINEDU FRANK 
---


### Licence
This project is licensed under the MIT License.

MIT © Obi chinedu Frank
