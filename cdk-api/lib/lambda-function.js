const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
  DB_WRITE_HOST: process.env.POSTGRES_WRITE_HOST,
  DB_READ_HOST: process.env.POSTGRES_READ_HOST,
  DB_PORT: process.env.POSTGRES_PORT,
  DB_NAME: process.env.POSTGRES_DB,
};

class LambdaFunction {
  constructor(scope, id, handlerFile, vpc) {
    this.lambda = new Function(scope, id, {
      runtime: Runtime.NODEJS_18_X,
      handler: handlerFile,
      code: Code.fromAsset(path.join(__dirname, "../lambda")),
      vpc: vpc,
      //  securityGroups: [],
      //    environment: config,
    });
  }
}

module.exports = { LambdaFunction };
