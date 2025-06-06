const { Stack, Duration } = require("aws-cdk-lib");
const { Vpc } = require("aws-cdk-lib/aws-ec2");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const {
  LambdaIntegration,
  RestApi,
  Cors,
} = require("aws-cdk-lib/aws-apigateway");
const { Rule, Schedule } = require("aws-cdk-lib/aws-events");
const { LambdaFunction } = require("aws-cdk-lib/aws-events-targets");

const path = require("path");

// const sqs = require('aws-cdk-lib/aws-sqs');
const { AmplifyStack } = require("./amplify-stack");
const { ServicePrincipal } = require("aws-cdk-lib/aws-iam");
const addResources = require("./add-resources");
const resourceConfig = require("./resource-config");
const { PostgresRDS } = require("./rds-db");

class CdkApiStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps & { AWS_ACCOUNT: string, AWS_REGION: string } & { CORS_DOMAINS: string[] }} props
   */
  constructor(scope, id, props) {
    super(scope, id, {
      ...props,
      env: {
        account: props.AWS_ACCOUNT,
        region: props.AWS_REGION,
      },
      CORS_DOMAINS: props.CORS_DOMAINS,
    });

    // The code that defines your stack goes here

    const vpc = Vpc.fromLookup(this, "ExistingVpc", {
      vpcName: props.VPC_NAME,
    });

    // example resource
    // const queue = new sqs.Queue(this, 'CdkApiQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });

    const amplifyApp = new AmplifyStack(
      this,
      "HomeDocAmplify",
      props.GIT_OAUTH_TOKEN
    );

    const rdsPostgres = new PostgresRDS(
      this,
      "ExistingIntance",
      vpc,
      props.POSTGRES_INSTANCE_IDENTIFIER,
      props.POSTGRES_ENDPOINT,
      props.POSTGRES_PORT
    );

    const corsOptions = {
      allowOrigins: props.CORS_DOMAINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: ["Content-Type"],
    };

    const api = new RestApi(this, "HomeDocApiGateway", {
      restApiName: "Homdocs",
      description: "API for Lambda functions - Homdocs",
      defaultCorsPreflightOptions: corsOptions,
    });

    const postgresConfig = {
      POSTGRES_HOST: props.POSTGRES_HOST,
      POSTGRES_PORT: props.POSTGRES_PORT,
      POSTGRES_DB: props.POSTGRES_DB,
      POSTGRES_USER: props.POSTGRES_USER,
      POSTGRES_PASSWORD: props.POSTGRES_PASSWORD,
    };

    let getAllHomeDocslambda;

    resourceConfig.functions.forEach((lambda) => {
      const fullPath = `${resourceConfig.baseRoute}${lambda.route}`;

      const lambdaFunction = new Function(this, lambda.lambdaName, {
        functionName: lambda.lambdaName,
        runtime: Runtime.NODEJS_20_X,
        handler: `${lambda.handlerFile}.handler`,
        code: Code.fromAsset(path.join(__dirname, "..", "lambda-dist")),
        environment: {
          ...postgresConfig,
          ALLOWED_ORIGINS: corsOptions.allowOrigins.join(","),
        },
        memorySize: 1024,
        timeout: Duration.seconds(30),
      });

      if (lambda.lambdaName === "GetAllHomeDocsFunction") {
        getAllHomeDocslambda = lambdaFunction;
      }

      lambdaFunction.addPermission("ApiGatewayInvoke", {
        principal: new ServicePrincipal("apigateway.amazonaws.com"),
      });

      const lambdaIntegration = new LambdaIntegration(lambdaFunction);
      const resource = addResources(api.root, fullPath, corsOptions);
      resource.addMethod(lambda.httpMethod, lambdaIntegration);
    });

    const lambdaKeepWarm = new Function(this, "KeepLambdaWarmFunction", {
      functionName: "KeepLambdaWarmFunction",
      runtime: Runtime.NODEJS_20_X,
      handler: `keepWarm.handler`,
      code: Code.fromAsset(path.join(__dirname, "..", "lambda", "handlers")),
      memorySize: 1024,
      timeout: Duration.seconds(30),
    });

    getAllHomeDocslambda.grantInvoke(lambdaKeepWarm);

    const lambdaKeepWarmTarget = new LambdaFunction(lambdaKeepWarm);

    new Rule(this, "KeepWarmRule", {
      ruleName: "KeepLambdaWarmSchedule",
      schedule: Schedule.cron({
        minute: "0/5",
        hour: "6-17", // 9-20 Israel time (UTC+3)
        weekDay: "MON-FRI",
      }),
      targets: [lambdaKeepWarmTarget],
    });
  }
}

module.exports = { CdkApiStack };
