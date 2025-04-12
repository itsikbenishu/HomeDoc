const amplify = require("aws-cdk-lib/aws-amplify");

class AmplifyStack {
  constructor(scope, id, oauthToken) {
    this.amplifyApp = new amplify.CfnApp(scope, id, {
      name: "HomeDocApp",
      repository: "https://github.com/itsikbenishu/HomeDoc",
      oauthToken: oauthToken,
    });
  }
}

module.exports = { AmplifyStack };
