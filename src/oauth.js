const AWS = require('aws-sdk');

const database = new AWS.DynamoDB.DocumentClient();
const accessTokenTableName = process.env.ACCESS_TOKEN_TABLE_NAME;

module.exports.retrieveAccessToken = (teamId) => {
	const params = {
		TableName: accessTokenTableName,
		Key: {
			teamId: teamId
		}
	};
	
	return new Promise((resolve, reject) => {
		database.get(params).promise()
			.then(result => resolve(result.Item.botAccessToken))
			.catch(error => reject(new Error(`Error retrieving OAuth access token: ${error}`)));
	});
};

module.exports.retrieveUserAccessToken = (teamId) => {
	const params = {
		TableName: accessTokenTableName,
		Key: {
			teamId: teamId
		}
	};

	return new Promise((resolve, reject) => {
		database.get(params).promise()
			.then(result => resolve(result.Item.userAccessToken))
			.catch(error => reject(new Error(`Error retrieving user OAuth access token: ${error}`)));
	});
};

module.exports.storeAccessToken = (teamId, botAccessToken, userAccessToken) => {
	const params = {
		TableName: accessTokenTableName,
		Item: {
			teamId: teamId,
			botAccessToken: botAccessToken,
			userAccessToken: userAccessToken
		}
	};
	
	return new Promise((resolve, reject) => {
		database.put(params).promise()
			.then(result => resolve())
			.catch(error => reject(new Error(`Error storing OAuth access token: ${error}`)));
	});
};
