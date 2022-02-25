# Guest Book

## Back end
To start the backend clone the project and make sure to create a schema named `guestbook` in the mysql database once done do the following


- run `npm i`
- node server.js
- run `npx sequelize-cli db:migrate`
- IF you want to seed the database run `npx sequelize-cli db:seed:all`


The server will start listening on port 5000

The collection used in testing the backend can be found in this link


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9205100-33dbe68d-7837-4cad-913c-6ea5c9e37847?action=collection%2Ffork&collection-url=entityId%3D9205100-33dbe68d-7837-4cad-913c-6ea5c9e37847%26entityType%3Dcollection%26workspaceId%3Debb85c04-d3b2-4b49-9fee-aefdd3b2b96f)

Just download it and run it locally

NOTE: The flow of authentication must be followed meaning you have to login first before trying any other route

Once the above steps are followed you will have a database of 100 users 1000 messages and 4000 replies to play around with

## Folder Structure

- API
  - Controllers
  - MiddleWares
  - Repository
  - Schemas
  - Services
  - Tests
  - Util

- DB
  - Config
  - Migrations
  - Models
  - Seeders

---
- Controllers hold all the routes to the API
- MiddleWares have token checking logic
- Repository have all the database communications
- Schemas have all the request schemas allowed for each route
- Services have all the application logic
- Tests as of the time of writing not unit tests were implemented
- Util have general utility functions

- Config holds the database connection configuration
- Migrations hold the database Tables structure
- Models hold the table representation in the app
- Seeders hold the general seed for populating the database
---
## Choices
- Opted to use SQL database as it can be tuned later using indexing and partitioning 
- Opted to use schema validators on middle-wares to nullify any bogus requests
- Used the repository design pattern to abstract the data layer logic from the service layer logic

## Improvements
- Can add a redis cache layer
- Can add a mail system to send emails to the users when a message is posted for them
- Can add a logger like Winston to log any interactions with the controllers
- Can make use of sockets to relay real time notifications to logged in users



## Front end
To start the front end simply navigate to the frontend directory then run the following

- run `npm i`
- run `npm start`

The react will run on port 3000

## Folder Structure

- API
- Component
- Redux
- Routes
- Styles
- Views

-----

- The API holds all the axios calls of the application
- Component holds all react fragments that are not full views
- Redux hold the state management logic for the App basically the JWT
- Routes hold the react router
- Styles holds any additional css
- Views holds the react fragments that are full views
---

The app is loaded on the Sign in page you can navigate to the register page

The app will not allow a user with no JWT to access the pages

Once logged in the user can view a list of users

Each user has a profile which shows the messages

Each message have a page that shows its replies

The user can create a message for any user

The user can edit/delete his messages

The user can reply to any message