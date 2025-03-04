# Backend Service

## Setup Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

    PORT=
    JWT_SECRET=
    PROJECT_ID=
    DATABASE_ID=
    ML_API_URL=

Fill the service account key file in the `serviceKey.json` file and firebase key file in the `firebaseKey.json` file.

## How to Run with Yarn Locally

Follow these steps to run the backend service using Yarn:

    npm install -g yarn
    yarn install
    yarn build
    yarn start

## How to Run with Docker

Follow these steps to run the backend service using Docker:

    docker build -t backend-service .
    docker run -p 8080:8080 backend-service

## API Endpoints
### AUTHENTICATION
POST ~ http://localhost:8080/firebase 
```
{
    "email": "your-email"
}
```
DELETE ~ http://localhost:8080/firebase 
- Header : Authorization Bearer `your-token`

### TRACKER
POST ~ http://localhost:8080/tracker
- Header : Authorization Bearer `your-token`
```
{
    "name" : "salman",
    "age": 21,
    "retireAge": 60,
    "retirePeriod": 30,
    "monthlyExpenses": 2000000
}
```
GET ~ http://localhost:8080/tracker
- Header : Authorization Bearer `your-token`

UPDATE ~ http://localhost:8080/tracker
- Header : Authorization Bearer `your-token`
```
{
    "name" : "salman",
    "age": 22,
    "retireAge": 61,
    "retirePeriod": 30,
    "monthlyExpenses": 2000000
}
```

### SAVINGS
GET ~ http://localhost:8080/tracker/savings
- Header : Authorization Bearer `your-token`

GET ~ http://localhost:8080/tracker/savingsname
- Header : Authorization Bearer `your-token`

POST ~ http://localhost:8080/tracker/savings
- Header : Authorization Bearer `your-token`
```
{
    "name": "Saham2",
    "amount": 2000000,
    "type": "investment"
}
```

PUT ~ http://localhost:8080/tracker/savings
- Header : Authorization Bearer `your-token`
```
{
    "name": "Saham2",
    "amount": 200000,
    "type": "saving"
}
```

PUT ~ http://localhost:8080/tracker/savingsinvest
- Header : Authorization Bearer `your-token`
```
{
    "name": "Saham2",
    "amount": 10000,
    "type": "investment"
}
```

DELETE ~ http://localhost:8080/tracker/savings
- Header : Authorization Bearer `your-token`
```
{
    "name": "Saham2"
}
```

### CALCULATOR
GET ~ http://localhost:8080/calculator
- Header : Authorization Bearer `your-token`

### STOCK
POST ~ http://localhost:8080/predict
- Header : Authorization Bearer `your-token`
```
{
    "stock_code":"BBCA",
    "start_date":"2024-12-11",
    "end_date":"2024-12-15"
}
```
