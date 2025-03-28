const { Stack, Duration } = require('aws-cdk-lib');
const { Vpc, SubnetType } = require('aws-cdk-lib/aws-ec2');
const { LambdaIntegration, RestApi } = require('aws-cdk-lib/aws-apigateway');

// const sqs = require('aws-cdk-lib/aws-sqs');
const { AmplifyStack } = require('./amplify-stack'); 
const { ApiGateway } = require('./api-gateway'); 
const { AuroraServerless } = require('./aurora-db'); 
const { LambdaFunction } = require('./lambda-function');
const { ServicePrincipal } = require('aws-cdk-lib/aws-iam');

class CdkApiStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, {
      ...props,
      env: {
        account: '303759787046',  
        region: 'eu-north-1'         
      }
    });

    // The code that defines your stack goes here

    const vpc = Vpc.fromLookup(this, 'ExistingVpc', {
      vpcName: 'portfoilo-vpc', 
    });    

    // example resource
    // const queue = new sqs.Queue(this, 'CdkApiQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });

    const amplifyApp = new AmplifyStack(this, 'HomeDocAmplify');

    const auroraServerless = new AuroraServerless(this, 'ExistingCluster', vpc, 'portfolio', 'portfolio-instance-1.chg6eo2ogcs7.eu-north-1.rds.amazonaws.com', 5432);

  //  const getAllHomeDocs = new LambdaFunction(this, 'HomeDocLambda1', 'getAllHomeDocs.handler', vpc);
    //const createHomeDoc = new LambdaFunction(this, 'HomeDocLambda2', 'createHomeDoc.handler', vpc);

    const { Function, Runtime, Code } = require('aws-cdk-lib/aws-lambda');
    const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');
    const path = require('path');
    const dotenv = require('dotenv');
    
    dotenv.config({ path: path.join(__dirname, '../../.env') });
    
    const config = {
      POSTGRES_WRITE_HOST: process.env.POSTGRES_WRITE_HOST,
      POSTGRES_READ_HOST: process.env.POSTGRES_READ_HOST,
      POSTGRES_PORT: process.env.POSTGRES_PORT,
      POSTGRES_DB: process.env.POSTGRES_DB,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    };
    

    const getAllHomeDocs = new NodejsFunction(this, 'HomeDocLambda1', {
      runtime: Runtime.NODEJS_20_X, 
      handler: 'getAllHomeDocs.handler', 
      code: Code.fromAsset(path.join(__dirname, '../lambda')), 
      // bundling: {
      //   externalModules: ['pg', 'drizzle-orm'],
      // },
      environment: config,  
    });
    

    getAllHomeDocs.addPermission('ApiGatewayInvoke', {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
    });
    
    
    const api = new RestApi(this, 'HomeDocApiGateway', {
      restApiName: 'Homdocs',
      description: 'API for Lambda functions - Homdocs',
    });

    const lambdaIntegration = new LambdaIntegration(getAllHomeDocs);
    const resource = api.root.addResource('getAllHomeDocs');
    resource.addMethod('GET', lambdaIntegration);  

    // const apiGateway = new ApiGateway(this, 'HomeDocApiGateway', {
    //   getAllHomeDocs: new LambdaIntegration(getAllHomeDocs),
    //  // createHomeDoc: new LambdaIntegration(createHomeDoc),
    //     });

  }
}

module.exports = { CdkApiStack }
