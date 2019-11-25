## Welcome to the mean stack User Management App

Simple application to maintain user details  

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **A**ngular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript
Use Node 10 or more

### Pre-requisites  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone 
cd mean-user-management-app
cp .env.example .env
npm install
npm start (for development)
local: http://localhost:4040/
```
### Connecting to database
Update your mongo db host url (MONGO_HOST) in .env.exmaple/.env file 
(User and Member collections)
