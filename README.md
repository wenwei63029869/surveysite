# SurveySite

Become an admin and create survey questions for every guest visting the website. 

**Setup**:

1. Clone this repo: `git clone https://github.com/wenwei63029869/surveysite.git`
2. Run `npm install` install all the dependencies
3. After install mysql in your computer, set up your development enviornment in `survey/config/config.json` (here assuming we are using mySQL)

  ```
   {
    "development": {
      "username": <username>,
      "password": null(if you have a password for your database),
      "database": <database name>,
      "host": "localhost",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
   }
 ```

Now all you need to is run `npm start`, all the tables and associations will be created automatically. Try to visit <a href="http://localhost:3000">http://localhost:3000</a>
