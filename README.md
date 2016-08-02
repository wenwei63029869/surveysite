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

Now all you need to is run `npm start`, all the tables and associations will be created automatically. You should see similar log output like this:

```
survey [master] :> npm start

> surveysite@0.0.0 start /Users/weiwen/Desktop/survey
> nodemon ./bin/www

[nodemon] 1.10.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS `Admins` (`id` INTEGER NOT NULL auto_increment , `email` VARCHAR(255), `password` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Connection has been established successfully.
Executing (default): SHOW INDEX FROM `Admins` FROM `test`
Executing (default): CREATE TABLE IF NOT EXISTS `Questions` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Questions` FROM `test`
Executing (default): CREATE TABLE IF NOT EXISTS `Answers` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(255), `counter` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `QuestionId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Answers` FROM `test`
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `ip` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Users` FROM `test`
Executing (default): CREATE TABLE IF NOT EXISTS `UserQuestions` (`status` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserId` INTEGER , `QuestionId` INTEGER , PRIMARY KEY (`UserId`, `QuestionId`), FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `UserQuestions` FROM `test`
```

Try to visit <a href="http://localhost:3000">http://localhost:3000</a> and play with it now.
