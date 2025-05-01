const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambda = new LambdaClient();
const functionsToWarm = ["GetAllHomeDocsFunction"];
let containerID;

exports.handler = async (event, context) => {
  const warmPromises = functionsToWarm.map(async (functionName) => {
    try {
      const command = new InvokeCommand({
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: Buffer.from(JSON.stringify({ source: "warm-up" })),
      });

      const response = await lambda.send(command);
      console.log(`Lambda function ${functionName} warmed up successfully`);
      return response;
    } catch (error) {
      console.error(
        `Error warming up function ${functionName}: ${error.message}`
      );
      throw error;
    }
  });

  await Promise.all(warmPromises);

  if (!containerID) {
    containerID = context.awsRequestId || `Date:${Date.now()}`;
    console.log(`Container initialized with ID: ${containerID}`);
  } else {
    console.log(`Reusing container with ID: ${containerID}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Lambda is warm!" }),
  };
};
