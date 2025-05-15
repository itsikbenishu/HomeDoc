const { DatabaseInstance } = require("aws-cdk-lib/aws-rds");

class PostgresRDS {
  constructor(scope, id, vpc, instanceIdentifier, endpoint, port) {
    this.dbInstance = DatabaseInstance.fromDatabaseInstanceAttributes(
      scope,
      id,
      {
        instanceIdentifier: instanceIdentifier,
        instanceEndpointAddress: endpoint,
        port: port,
        vpc: vpc,
      }
    );
  }
}

module.exports = { PostgresRDS };
