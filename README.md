# AWS Lambda using Serverless Framework

This project is a simple test of aws lambda. The objective is undestand how its work, how to deploy and test.

#### Setup

To setup the Serverless framework globally, just run this command: 

```npm install serverless -g```

#### Config AWS Credencials

Look at the Serverless Official documentation for more details: [Serverless AWS Lambda CLI Reference](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)

#### Deploy


#### How to debug

To debug our serverless application, we need to use a plugin that emulates AWS Lambda and API Gateway offline.

*Obs: The run offline, Serverless must be installed into your project ```npm install serverless --save-dev```*

The extension we should use is [Serverless Offline](https://github.com/dherault/serverless-offline), see its documentation for more details.

First, add Serverless Offline to your project:
> npm install serverless-offline --save-dev

Then put in your project's `serverless.yml` file the entry to `serverless-offline` plugin. 
It should look something like this: 

```
plugins:
    - serverless-offline
```

To run, just type: 

```
serverless offline start
```

The server will be available at: ```http://localhost:3000```

