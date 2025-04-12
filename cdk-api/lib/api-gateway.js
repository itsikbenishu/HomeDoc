const apigateway = require("aws-cdk-lib/aws-apigateway");

class ApiGateway {
  constructor(scope, id, props) {
    this.api = new apigateway.RestApi(scope, id, {
      restApiName: "Homdocs",
      description: "API for Lambda functions - Homdocs",
      deployOptions: {
        stageName: "prod",
        loggingLevel: "INFO",
        accessLogDestination: new LogGroupLogDestination(
          new LogGroup(this, "HomdocsApiLogs")
        ),
        dataTraceEnabled: true,
      },
    });

    const lambdaIntegration1 = new apigateway.LambdaIntegration(
      props.getAllHomeDocs
    );
    const lambdaIntegration2 = new apigateway.LambdaIntegration(
      props.createHomeDoc
    );

    const homeDocs = this.api.root.addResource("homeDocs");
    homeDocs.addResource("getAllHomeDocs").addMethod("GET", lambdaIntegration1);
    homeDocs.addResource("createHomeDoc").addMethod("POST", lambdaIntegration2);
  }
}

module.exports = { ApiGateway };
