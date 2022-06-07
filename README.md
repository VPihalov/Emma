# Reward Service
Microservice for reward new users with a free share when they sign up to use free stock trading service

Reward new users with a free share when they sign up to use our free stock trading service or when they refer a friend.

The share they receive will be randomly chosen and range in value from £3 to £200. The distribution of these rewards must allow us to keep the cost of each new acquired customer under control, so the algorithm needs to be implemented in a way that forces 95% of distributed rewards to have a value between £3-£10, 3% between £10-£25 and 2% between £25-£200.


### Add .env file

Add .env file to the root of the project, in which you should add env variables - see .env.example. The 'env.example' file should be renamed into .env later.

File that lists schema validation for env variables `utils/config-validation-schema.ts`

### Installing Dependencies and Running app

As a package manager Reward Service uses yarn
Set environment variables for the service:

```sh
nvm use 16
# APP CONFIG
HOST=127.0.0.1
PORT=5000
CACHE=true
APP_LOGGING=true

# REWARD SETUP
LOW_MIN=3
LOW_MAX=10
MIDDLE_MIN=11
MIDDLE_MAX=25
HIGH_MIN=26
HIGH_MAX=200
```

Install dependencies and run for local development:

```sh
yarn or yarn install
yarn start:dev
```

## Api documentation

Project uses swagger OAS3 for api documentation. After creating/updating api you should generate actual openapi.yaml file by removing existing openapi.yaml
from the root of the project and rerun application (it will generate actual openapi.yaml automatically).
To see actual api documentation you can go to the `{host}/api`

![Reward git-flow](src/images/swagger.png?raw=true "Swagger doc")
