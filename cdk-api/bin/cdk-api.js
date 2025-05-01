#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const path = require("path");

const dotenv = require("dotenv");
const { CdkApiStack } = require("../lib/cdk-api-stack");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = new cdk.App();
new CdkApiStack(app, "CdkApiStack", {
  AWS_ACCOUNT: process.env.AWS_ACCOUNT,
  AWS_REGION: process.env.AWS_REGION,
  GIT_OAUTH_TOKEN: process.env.GIT_OAUTH_TOKEN,
  POSTGRES_WRITE_HOST: process.env.POSTGRES_WRITE_HOST,
  POSTGRES_READ_HOST: process.env.POSTGRES_READ_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  CORS_DOMAINS: [process.env.LOCAL_DOMAIN, process.env.PROD_DOMAIN],

  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
