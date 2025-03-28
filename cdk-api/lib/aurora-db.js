const { DatabaseCluster } = require('aws-cdk-lib/aws-rds');

class AuroraServerless {
  constructor(scope, id, vpc, clusterIdentifier, endpoint, port) {
    this.dbCluster = DatabaseCluster.fromDatabaseClusterAttributes(scope, id, {
      clusterIdentifier: clusterIdentifier,
      instanceEndpointAddress: endpoint,
      port: port,
      securityGroups: [],  
      vpc: vpc,
    });
  }
}

module.exports = { AuroraServerless };
