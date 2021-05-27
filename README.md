# predstock API

Start a predstock API quickly using Node, Express & Postgres.

**Dependencies**

We use **express** to serve the API, **body-parser** to parse responses, **postgres** for the database, **knex** as the query engine, **dotenv** to protect environment variables, **helmut** to add proper headers, **cors** to prevent/allow XSS, **yahoo-stock-prices** to scrape stock prices from Yahoo Finance, **currency-pattern-detector** to finding patterns in a temporary financial row, **morgan** as our logger, and **nodemon** as a dev dependency to watch for changes.

All dependencies are included in the cloned project.

## Instructions

**1. Clone the repo**

```
git clone https://github.com/ricardo-tavares-santos/predstock-api.git
```

**2. CD into the project**

```
cd predstock-api
```

**3. Install dependencies**

```
npm install
```

**4. Start Postgres**

```
brew services start postgresql
```

**Note:** You can use Postgres or MYSQL. We are using Postgres. If you would like to use MYSQL instead of Postgres you will need to `npm uninstall pg` and `npm install mysql`. Then edit the above command to start MYSQL started on your computer.

**5. Create a database**

Change the database name to whatever you would like to name the database. Be sure to also change the database name in server.js to whatever you name the database.

```
createdb predstock-api
```

**6. Create a database table**

Open pSequel and run the following command.

```
CREATE TABLE Company (
 id serial PRIMARY KEY,
 symbol text UNIQUE NOT NULL,
 name VARCHAR(100),
 exchange VARCHAR(100)
);
```

- TODO: Historical Prices & Machine Learning

CREATE TABLE HistoricalPrices (
 id serial PRIMARY KEY,
 symbol text NOT NULL,
 date int,
 open int,
 high int,
 low int,
 close int,
 volume int,
 adjclose int 
);

CREATE TABLE MachineLearning_PatternDetector (
 id serial PRIMARY KEY,
 symbol text NOT NULL,
 dateStart int,
 pattern VARCHAR(100),
 bullish BOOLEAN NOT NULL, 
 profit_1_dayTrading int,
 profit_3_dayTrading int,
 profit_5_dayTrading int,
 profit_7_dayTrading int
);


## predstock Frontend
View the [repository for the frontend](https://github.com/ricardo-tavares-santos/predstock-frontend) that goes along with this API. It uses React and Bootstrap to display a responsive data table. It serves as the perfect starter for the frontend, however, you can use any frontend to access this API.

## Further Information
An important piece that is missing from this API is an authentication API. In that case it is recommended to install bCrypt for password hashing and authentication. Then, more routes should be created for registering, logging in and logging out users. There should also be a scheme for keeping users logged in. The suggested method for persisting logins would be to use JWT for token creation, Redis to store tokens in server memory, and localStorage to save tokens on the frontend. The tokens stored in localStorage will be sent back to the API via authorization headers for protected requests and would need to be verified by the server.